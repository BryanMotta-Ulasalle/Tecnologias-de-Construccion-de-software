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
from shared.messaging import connect_rabbit

logging.basicConfig(level=logging.INFO, format='[%(asctime)s] %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

if not logger.handlers:
    stream_handler = logging.StreamHandler()
    stream_handler.setFormatter(logging.Formatter('[%(asctime)s] %(levelname)s - %(message)s'))
    file_handler = logging.FileHandler(os.path.join(os.path.dirname(__file__), 'inventory_release_consumer.log'), encoding='utf-8')
    file_handler.setFormatter(logging.Formatter('[%(asctime)s] %(levelname)s - %(message)s'))
    logger.addHandler(stream_handler)
    logger.addHandler(file_handler)
    logger.propagate = False


class InventoryReleaseConsumer:
    """Listens for inventory.release and restores stock if it was reserved."""

    def __init__(self):
        self.app = create_app()
        self.app_context = self.app.app_context()
        self.app_context.push()

    def handle_release(self, ch, method, properties, body):
        try:
            payload = json.loads(body)
            saga_id = properties.headers.get('saga_id') if properties and properties.headers else None
            order_id = payload.get('order_id')
            items = payload.get('productos', [])
            event_type_reserved = 'inventory.reserved'
            event_type_released = 'inventory.released'

            logger.info(f'[SAGA:{saga_id}] Received inventory.release for order {order_id} with {len(items)} items')

            # Only release if we have a recorded Reservation for this saga
            from models import Reservation
            reservation = None
            if saga_id:
                reservation = Reservation.query.filter_by(saga_id=saga_id).first()
                already_released = ProcessedMessage.query.filter_by(saga_id=saga_id, event_type=event_type_released).first()
                if already_released:
                    logger.info(f'[SAGA:{saga_id}] Already released; skipping')
                    ch.basic_ack(delivery_tag=method.delivery_tag)
                    return
                if not reservation:
                    logger.info(f'[SAGA:{saga_id}] No reservation record found; proceeding using payload as fallback')

            # Aggregate quantities per product
            from collections import Counter
            quantities = Counter([it.get('id') for it in items])

            for producto_id, quantity in quantities.items():
                p = Producto.query.get(producto_id)
                if not p:
                    logger.warning(f'[SAGA:{saga_id}] Producto {producto_id} not found for release')
                    continue
                old_stock = p.stock
                p.stock = p.stock + quantity
                db.session.add(p)
                logger.info(f'[SAGA:{saga_id}] Released stock for producto {producto_id}: {old_stock} -> {p.stock} (+{quantity})')

            # mark release processed
            if saga_id:
                pm = ProcessedMessage(saga_id=saga_id, event_type=event_type_released)
                db.session.add(pm)

                # delete reservation record
                if reservation:
                    db.session.delete(reservation)

            db.session.commit()
            logger.info(f'[SAGA:{saga_id}] Inventory release committed for order {order_id}')

            ch.basic_ack(delivery_tag=method.delivery_tag)

        except json.JSONDecodeError as je:
            logger.error(f'Invalid JSON in message: {je}')
            ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)
        except Exception as e:
            logger.exception(f'Unexpected error handling release message: {e}')
            ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)

    def run(self):
        try:
            logger.info('Connecting to RabbitMQ for inventory release consumer...')
            connection = connect_rabbit()
            channel = connection.channel()

            channel.queue_declare(queue='inventory.release', durable=True, arguments={'x-queue-type': 'quorum'})

            channel.basic_consume(
                queue='inventory.release',
                on_message_callback=self.handle_release,
                auto_ack=False
            )

            logger.info('Inventory release consumer started. Listening for inventory.release...')
            channel.start_consuming()

        except KeyboardInterrupt:
            logger.info('Inventory release consumer shutting down...')
            connection.close()
        except Exception as e:
            logger.error(f'Error in inventory release consumer: {e}')


if __name__ == '__main__':
    consumer = InventoryReleaseConsumer()
    consumer.run()
