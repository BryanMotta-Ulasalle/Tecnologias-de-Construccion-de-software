import sys
import os
import json
import pika
import logging
from datetime import datetime

# ensure shared package is importable
BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if BASE not in sys.path:
    sys.path.insert(0, BASE)

from app import create_app
from models import db, Producto, ProcessedMessage
from shared.messaging import connect_rabbit, publish
from collections import Counter

logging.basicConfig(level=logging.INFO, format='[%(asctime)s] %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

if not logger.handlers:
    stream_handler = logging.StreamHandler()
    stream_handler.setFormatter(logging.Formatter('[%(asctime)s] %(levelname)s - %(message)s'))
    file_handler = logging.FileHandler(os.path.join(os.path.dirname(__file__), 'inventory_consumer.log'), encoding='utf-8')
    file_handler.setFormatter(logging.Formatter('[%(asctime)s] %(levelname)s - %(message)s'))
    logger.addHandler(stream_handler)
    logger.addHandler(file_handler)
    logger.propagate = False


class InventoryConsumer:
    def __init__(self):
        self.app = create_app()
        self.app_context = self.app.app_context()
        self.app_context.push()

    def handle_order(self, ch, method, properties, body):
        """Process order.created event, reserve stock, and publish result."""
        try:
            payload = json.loads(body)
            saga_id = properties.headers.get('saga_id') if properties and properties.headers else None
            order_id = payload.get('order_id')
            items = payload.get('productos', [])
            event_type = 'order.created'

            logger.info(f'[SAGA:{saga_id}] Processing order {order_id} with {len(items)} items')
            print(f'[SAGA:{saga_id}] Processing order {order_id} with {len(items)} items', flush=True)

            # Idempotency check
            if saga_id:
                existing = ProcessedMessage.query.filter_by(saga_id=saga_id, event_type=event_type).first()
                if existing:
                    logger.info(f'[SAGA:{saga_id}] Already processed, skipping (idempotent)')
                    ch.basic_ack(delivery_tag=method.delivery_tag)
                    return

            # Validate stock for the total requested quantity per product FIRST
            quantities = Counter([it.get('id') for it in items])
            insufficient = []
            products_by_id = {}
            for producto_id, quantity in quantities.items():
                p = Producto.query.get(producto_id)
                if not p:
                    logger.warning(f'[SAGA:{saga_id}] Producto {producto_id} not found')
                    insufficient.append({'id': producto_id, 'reason': 'not_found', 'quantity_requested': quantity})
                    continue
                products_by_id[producto_id] = p
                if p.stock < quantity:
                    logger.info(f'[SAGA:{saga_id}] Producto {producto_id} ({p.nombre}) has insufficient stock: {p.stock} < requested {quantity}')
                    insufficient.append({'id': producto_id, 'reason': 'insufficient_stock', 'available': p.stock, 'quantity_requested': quantity})

            # TESTING: Controlled failure injection via FAIL_FOR_PRODUCT_ID env var
            fail_for_product = os.getenv('FAIL_FOR_PRODUCT_ID')
            if fail_for_product:
                product_ids_in_order = [it.get('id') for it in items]
                if str(fail_for_product) in [str(pid) for pid in product_ids_in_order]:
                    logger.warning(f'[SAGA:{saga_id}] FAILURE INJECTION TRIGGERED for product {fail_for_product}')
                    print(f'[SAGA:{saga_id}] FAILURE INJECTION TRIGGERED for product {fail_for_product}', flush=True)
                    insufficient = [{'id': int(fail_for_product), 'reason': 'testing_failure_injection', 'quantity_requested': quantities.get(int(fail_for_product), 0)}]

            # If any item insufficient, publish failure and return
            if insufficient:
                logger.warning(f'[SAGA:{saga_id}] RESERVE FAILED for order {order_id}. Issues: {insufficient}')
                print(f'[SAGA:{saga_id}] RESERVE FAILED for order {order_id}. Issues: {insufficient}', flush=True)
                try:
                    publish('inventory.reserve_failed', {
                        'order_id': order_id,
                        'issues': insufficient,
                        'timestamp': datetime.utcnow().isoformat()
                    }, saga_id=saga_id)
                    logger.info(f'[SAGA:{saga_id}] Published inventory.reserve_failed')
                    print(f'[SAGA:{saga_id}] Published inventory.reserve_failed', flush=True)
                except Exception as pub_err:
                    logger.error(f'[SAGA:{saga_id}] Failed to publish reserve_failed: {pub_err}')
                    print(f'[SAGA:{saga_id}] Failed to publish reserve_failed: {pub_err}', flush=True)
                ch.basic_ack(delivery_tag=method.delivery_tag)
                return

            # All requested quantities are available - decrement stock in transaction
            try:
                for producto_id, quantity in quantities.items():
                    p = products_by_id[producto_id]
                    old_stock = p.stock
                    p.stock = p.stock - quantity
                    db.session.add(p)
                    logger.info(f'[SAGA:{saga_id}] Decremented stock for producto {producto_id} ({p.nombre}): {old_stock} -> {p.stock} (qty {quantity})')

                # Mark as processed to ensure idempotency for order.created
                if saga_id:
                    pm_created = ProcessedMessage(saga_id=saga_id, event_type=event_type)
                    db.session.add(pm_created)

                # Also record a Reservation record so releases can restore stock
                if saga_id:
                    from models import Reservation
                    reservation = Reservation(saga_id=saga_id, order_id=order_id, items=items)
                    db.session.add(reservation)

                db.session.commit()
                logger.info(f'[SAGA:{saga_id}] Stock reserved successfully for order {order_id}')
                print(f'[SAGA:{saga_id}] Stock reserved successfully for order {order_id}', flush=True)

                # Publish success
                try:
                    publish('inventory.reserved', {
                        'order_id': order_id,
                        'timestamp': datetime.utcnow().isoformat()
                    }, saga_id=saga_id)
                    logger.info(f'[SAGA:{saga_id}] Published inventory.reserved')
                    print(f'[SAGA:{saga_id}] Published inventory.reserved', flush=True)
                except Exception as pub_err:
                    logger.error(f'[SAGA:{saga_id}] Failed to publish inventory.reserved: {pub_err}')
                    print(f'[SAGA:{saga_id}] Failed to publish inventory.reserved: {pub_err}', flush=True)

            except Exception as db_err:
                db.session.rollback()
                logger.error(f'[SAGA:{saga_id}] DB transaction failed: {db_err}')
                print(f'[SAGA:{saga_id}] DB transaction failed: {db_err}', flush=True)
                try:
                    publish('inventory.reserve_failed', {
                        'order_id': order_id,
                        'reason': 'transaction_error',
                        'error': str(db_err),
                        'timestamp': datetime.utcnow().isoformat()
                    }, saga_id=saga_id)
                    logger.info(f'[SAGA:{saga_id}] Published inventory.reserve_failed (transaction error)')
                    print(f'[SAGA:{saga_id}] Published inventory.reserve_failed (transaction error)', flush=True)
                except Exception as pub_err:
                    logger.error(f'[SAGA:{saga_id}] Failed to publish reserve_failed: {pub_err}')
                    print(f'[SAGA:{saga_id}] Failed to publish reserve_failed: {pub_err}', flush=True)

            ch.basic_ack(delivery_tag=method.delivery_tag)

        except json.JSONDecodeError as je:
            logger.error(f'Invalid JSON in message: {je}')
            ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)
        except Exception as e:
            logger.exception(f'Unexpected error handling message: {e}')
            ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)

    def run(self):
        """Start listening for order.created events."""
        try:
            logger.info('Connecting to RabbitMQ...')
            conn = connect_rabbit()
            channel = conn.channel()
            queue = 'order.created'
            logger.info(f'Declaring queue: {queue}')
            channel.queue_declare(queue=queue, durable=True, arguments={'x-queue-type': 'quorum'})
            channel.basic_qos(prefetch_count=1)
            channel.basic_consume(queue=queue, on_message_callback=self.handle_order)
            logger.info('✅ Inventory consumer started, waiting for messages...')
            channel.start_consuming()
        except Exception as e:
            logger.exception(f'Consumer error: {e}')
        finally:
            self.app_context.pop()


if __name__ == '__main__':
    consumer = InventoryConsumer()
    consumer.run()
