from kafka import KafkaProducer, KafkaConsumer
import json
from app.core.config import settings

def get_producer():
    try:
        return KafkaProducer(
            bootstrap_servers=settings.KAFKA_BOOTSTRAP_SERVERS,
            value_serializer=lambda v: json.dumps(v).encode('utf-8')
        )
    except:
        print("Kafka Producer could not be initialized. Check connection.")
        return None

def trigger_document_ocr(doc_id: int):
    """Sends a message to Kafka queue for background OCR processing (Module 1/2 spec)."""
    producer = get_producer()
    if producer:
        producer.send('document_ocr_tasks', {'document_id': doc_id})
        producer.close()
