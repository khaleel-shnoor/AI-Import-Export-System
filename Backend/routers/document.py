from fastapi import APIRouter, UploadFile, File, BackgroundTasks, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import async_session, get_db
from models.models import Document, Shipment
from schemas.schemas import DocumentResponse
from services.ocr_service import extract_text_from_file, process_invoice_with_llm
import shutil
import os

router = APIRouter(prefix="/documents", tags=["Documents"])


from database import async_session

async def background_process_invoice(file_path: str, file_ext: str, doc_id: int):
    db = async_session()

    try:
        raw_text = extract_text_from_file(file_path, file_ext)
        structured_json = await process_invoice_with_llm(raw_text)

        doc = await db.get(Document, doc_id)

        if not doc:
            return

        doc.extracted_data = structured_json

        if "error" in structured_json:
            doc.status = "Failed"
        else:
            doc.status = "Completed"

            new_shipment = Shipment(
                product_name=structured_json.get("product_name"),
                quantity=int(structured_json.get("quantity", 0)),
                unit_price=float(structured_json.get("price", 0)),
                origin_country=structured_json.get("country")
            )

            db.add(new_shipment)
            await db.commit()
            await db.refresh(new_shipment)

            doc.shipment_id = new_shipment.id

        await db.commit()

    except Exception as e:
        print("BACKGROUND ERROR:", e)
        await db.rollback()

    finally:
        await db.close()

        if os.path.exists(file_path):
            os.remove(file_path)


# ✅ Upload API
@router.post("/upload-invoice/", response_model=DocumentResponse)
async def upload_invoice(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db)
):
    # Save file temporarily
    file_ext = os.path.splitext(file.filename)[1].lower()
    temp_path = f"temp_{file.filename}"

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Create document record
    new_doc = Document(file_url=file.filename, status="Processing")
    db.add(new_doc)
    await db.commit()
    await db.refresh(new_doc)

    # Run background task
    background_tasks.add_task(
        background_process_invoice,
        temp_path,
        file_ext,
        new_doc.id
    )

    return {
        "id": new_doc.id,
        "status": "Processing",
        "message": "Invoice uploaded and is processing in the background."
    }



@router.get("/{doc_id}", response_model=DocumentResponse)
async def get_document(doc_id: int, db: AsyncSession = Depends(get_db)):
    doc = await db.get(Document, doc_id)

    if not doc:
        return {"error": "Document not found"}

    return doc