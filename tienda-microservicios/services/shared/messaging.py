import os
import json
import pika

def connect_rabbit():
    host = os.getenv('RABBIT_HOST', 'localhost')
    user = os.getenv('RABBIT_USER')
    password = os.getenv('RABBIT_PASS')
    if user and password:
        credentials = pika.PlainCredentials(user, password)
        params = pika.ConnectionParameters(host=host, credentials=credentials)
    else:
        params = pika.ConnectionParameters(host=host)
    return pika.BlockingConnection(params)

def publish(event_type, payload, saga_id=None):
    conn = connect_rabbit()
    channel = conn.channel()
    queue = event_type  # simple mapping: event_type -> queue name
    channel.queue_declare(queue=queue, durable=True, arguments={'x-queue-type': 'quorum'})
    body = json.dumps(payload)
    properties = pika.BasicProperties(headers={'saga_id': saga_id} if saga_id else None, delivery_mode=2)
    channel.basic_publish(exchange='', routing_key=queue, body=body, properties=properties)
    conn.close()
