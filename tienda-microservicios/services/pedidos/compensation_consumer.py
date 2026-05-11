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
from models import db, Pedido, SagaState
from shared.messaging import connect_rabbit, publish

logging.basicConfig(level=logging.INFO, format='[%(asctime)s] %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

if not logger.handlers:
    stream_handler = logging.StreamHandler()
    stream_handler.setFormatter(logging.Formatter('[%(asctime)s] %(levelname)s - %(message)s'))
    file_handler = logging.FileHandler(os.path.join(os.path.dirname(__file__), 'compensation_consumer.log'), encoding='utf-8')
    file_handler.setFormatter(logging.Formatter('[%(asctime)s] %(levelname)s - %(message)s'))
    logger.addHandler(stream_handler)
    logger.addHandler(file_handler)
    logger.propagate = False


class CompensationConsumer:
    """
    Listens for FAILURE events and performs compensation actions:
    - inventory.reserve_failed → Cancel order and update saga state
    - payment.failed → Release inventory
    """
    
    def __init__(self):
        self.app = create_app()
        self.app_context = self.app.app_context()
        self.app_context.push()

    def handle_reserve_failed(self, ch, method, properties, body):
        """
        COMPENSATION: Process inventory.reserve_failed event
        
        Actions:
        1. Update Pedido.estado from 'pendiente' to 'cancelado'
        2. Update SagaState to 'COMPENSATION_STARTED'
        3. Publish 'order.cancelled' event
        """
        try:
            payload = json.loads(body)
            saga_id = properties.headers.get('saga_id') if properties and properties.headers else None
            order_id = payload.get('order_id')
            issues = payload.get('issues', [])

            logger.info(f'[SAGA:{saga_id}] Received inventory.reserve_failed for order {order_id}')
            print(f'[SAGA:{saga_id}] Received inventory.reserve_failed for order {order_id}', flush=True)
            
            # COMPENSATION ACTION 1: Update Pedido state
            pedido = Pedido.query.get(order_id)
            if pedido:
                old_estado = pedido.estado
                pedido.estado = 'cancelado'
                db.session.add(pedido)
                logger.info(f'[SAGA:{saga_id}] COMPENSATION: Pedido {order_id} estado {old_estado} → cancelado')
                print(f'[SAGA:{saga_id}] COMPENSATION: Pedido {order_id} estado {old_estado} → cancelado', flush=True)
            else:
                logger.warning(f'[SAGA:{saga_id}] Pedido {order_id} not found for compensation')

            # COMPENSATION ACTION 2: Update SagaState
            if saga_id:
                saga_state = SagaState.query.get(saga_id)
                if saga_state:
                    saga_state.state = 'COMPENSATION_STARTED'
                    saga_state.data = {
                        'failure_reason': 'inventory_reserve_failed',
                        'issues': issues,
                        'compensation_timestamp': datetime.utcnow().isoformat()
                    }
                    db.session.add(saga_state)
                    logger.info(f'[SAGA:{saga_id}] Updated SagaState to COMPENSATION_STARTED')
                    print(f'[SAGA:{saga_id}] Updated SagaState to COMPENSATION_STARTED', flush=True)

            db.session.commit()

            # COMPENSATION ACTION 3: Publish order.cancelled event
            try:
                publish('order.cancelled', {
                    'order_id': order_id,
                    'reason': 'inventory_reserve_failed',
                    'issues': issues,
                    'compensation_timestamp': datetime.utcnow().isoformat()
                }, saga_id=saga_id)
                logger.info(f'[SAGA:{saga_id}] Published order.cancelled (compensation)')
                print(f'[SAGA:{saga_id}] Published order.cancelled (compensation)', flush=True)
            except Exception as pub_err:
                logger.error(f'[SAGA:{saga_id}] Failed to publish order.cancelled: {pub_err}')
                print(f'[SAGA:{saga_id}] Failed to publish order.cancelled: {pub_err}', flush=True)

            # COMPENSATION ACTION 4: Publish inventory.release to restore stock if needed
            try:
                productos = []
                if pedido:
                    productos = pedido.productos
                publish('inventory.release', {
                    'order_id': order_id,
                    'productos': productos,
                    'reason': 'compensation_inventory_release',
                    'compensation_timestamp': datetime.utcnow().isoformat()
                }, saga_id=saga_id)
                logger.info(f'[SAGA:{saga_id}] Published inventory.release (compensation)')
                print(f'[SAGA:{saga_id}] Published inventory.release (compensation)', flush=True)
            except Exception as pub_err:
                logger.error(f'[SAGA:{saga_id}] Failed to publish inventory.release: {pub_err}')
                print(f'[SAGA:{saga_id}] Failed to publish inventory.release: {pub_err}', flush=True)

            ch.basic_ack(delivery_tag=method.delivery_tag)

        except json.JSONDecodeError as je:
            logger.error(f'Invalid JSON in message: {je}')
            ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)
        except Exception as e:
            logger.exception(f'Unexpected error in compensation handler: {e}')
            ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)

    def run(self):
        """Start listening for compensation events."""
        try:
            logger.info('Connecting to RabbitMQ for compensation consumer...')
            print('Connecting to RabbitMQ for compensation consumer...', flush=True)
            
            connection = connect_rabbit()
            channel = connection.channel()
            
            # Declare queues with quorum type (same as inventory_consumer)
            channel.queue_declare(
                queue='inventory.reserve_failed',
                durable=True,
                arguments={'x-queue-type': 'quorum'}
            )
            
            # Bind compensation consumer
            channel.basic_consume(
                queue='inventory.reserve_failed',
                on_message_callback=self.handle_reserve_failed,
                auto_ack=False
            )
            
            logger.info('Compensation consumer started. Listening for inventory.reserve_failed...')
            print('Compensation consumer started. Listening for inventory.reserve_failed...', flush=True)
            
            channel.start_consuming()
            
        except KeyboardInterrupt:
            logger.info('Compensation consumer shutting down...')
            print('Compensation consumer shutting down...', flush=True)
            connection.close()
        except Exception as e:
            logger.error(f'Error in compensation consumer: {e}')
            print(f'Error in compensation consumer: {e}', flush=True)


if __name__ == '__main__':
    consumer = CompensationConsumer()
    consumer.run()
