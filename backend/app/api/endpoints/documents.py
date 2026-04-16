from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.all_models import Document
from app.models.schemas import DocumentResponse

router = APIRouter()

@router.post("/upload", response_model=DocumentResponse)
async def upload_document(
    file: UploadFile = File(...),
    document_type: str = Form(...),
    db: Session = Depends(get_db)
):
    """
    Mock endpoint for Document Intelligence module (BL Drafts, VGM).
    In a real app, this would upload to AWS S3 and trigger a Kafka job for OCR.
    """
    if file.content_type not in ["application/pdf", "image/png", "image/jpeg"]:
        raise HTTPException(status_code=400, detail="Invalid file type")

    # Mock DB entry
    new_doc = Document(
        filename=file.filename,
        document_type=document_type,
        s3_url=f"s3://mock-bucket/{file.filename}",
        extracted_data='{"status": "pending_ocr"}'
    )
    db.add(new_doc)
    db.commit()
    db.refresh(new_doc)
    
    return new_doc

@router.get("/{doc_id}", response_model=DocumentResponse)
def get_document(doc_id: int, db: Session = Depends(get_db)):
    doc = db.query(Document).filter(Document.id == doc_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc
