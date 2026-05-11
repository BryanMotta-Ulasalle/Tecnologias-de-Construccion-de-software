import sys
import os
import time
import json
import logging
# ensure repo services folder is on path so `shared` imports work
BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if BASE not in sys.path:
    sys.path.insert(0, BASE)

from shared.messaging import publish
from app import create_app
from models import db, Outbox, SagaState

logging.basicConfig(level=logging.INFO, format='[%(asctime)s] %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

if not logger.handlers:
    stream_handler = logging.StreamHandler()
    stream_handler.setFormatter(logging.Formatter('[%(asctime)s] %(levelname)s - %(message)s'))
    file_handler = logging.FileHandler(os.path.join(os.path.dirname(__file__), 'outbox_publisher.log'), encoding='utf-8')
    file_handler.setFormatter(logging.Formatter('[%(asctime)s] %(levelname)s - %(message)s'))
    logger.addHandler(stream_handler)
    logger.addHandler(file_handler)
    logger.propagate = False


class OutboxPublisher:
    def __init__(self):
        self.app = create_app()
        self.app_context = self.app.app_context()
        self.app_context.push()
        self.batch_size = 50
        self.poll_interval = 1  # seconds

    def publish_pending(self):
        """Fetch pending outbox records and publish them to RabbitMQ."""
        while True:
            try:
                rows = Outbox.query.filter_by(sent=False).order_by(Outbox.created_at.asc()).limit(self.batch_size).all()
                
                if not rows:
                    time.sleep(self.poll_interval)
                    continue

                logger.info(f'Publishing {len(rows)} pending events...')
                
                for r in rows:
                    try:
                        saga_id = r.saga_id
                        event_type = r.event_type
                        payload = r.payload
                        
                        logger.info(f'[SAGA:{saga_id}] Publishing {event_type} (id={r.id})')
                        
                        # Publish to RabbitMQ
                        publish(event_type, payload, saga_id=saga_id)
                        
                        # Mark as sent
                        r.sent = True
                        
                        # Update saga state
                        saga = SagaState.query.get(saga_id)
                        if saga:
                            saga.state = 'EVENT_PUBLISHED'
                        
                        db.session.commit()
                        logger.info(f'[SAGA:{saga_id}] Successfully published and marked as sent')
                        
                    except Exception as e:
                        db.session.rollback()
                        logger.error(f'[SAGA:{saga_id}] Failed to publish event id={r.id}: {e}')
                        # Don't re-raise; continue with next record
                
                time.sleep(0.1)  # brief pause between batches
                
            except Exception as e:
                logger.exception(f'Unexpected error in publisher loop: {e}')
                time.sleep(self.poll_interval)

    def run(self):
        """Start the outbox publisher."""
        try:
            logger.info('✅ Outbox publisher started')
            self.publish_pending()
        except KeyboardInterrupt:
            logger.info('Outbox publisher stopped')
        finally:
            self.app_context.pop()


if __name__ == '__main__':
    publisher = OutboxPublisher()
    publisher.run()
