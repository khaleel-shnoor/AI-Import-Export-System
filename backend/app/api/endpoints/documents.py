from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.all_models import Document
from app.models.schemas import DocumentResponse

from app.infrastructure.kafka_messaging import trigger_document_ocr

router = APIRouter()

@router.post("/upload", response_model=DocumentResponse)
async def upload_document(
    file: UploadFile = File(...),
    document_type: str = Form(...),
    db: Session = Depends(get_db)
):
    """
    Online Business Suite: Shippers handle BL Drafts and VGM declarations.
    AI-powered platform processes these using Document Intelligence (OCR).
    """
    new_doc = Document(
        filename=file.filename,
        document_type=document_type,
        s3_url=f"s3://shipping-docs/{file.filename}",
        extracted_data='{"status": "processing_started"}'
    )
    db.add(new_doc)
    db.commit()
    db.refresh(new_doc)
    
    # Trigger background OCR processing via Kafka
    trigger_document_ocr(new_doc.id)
    
    return new_doc
