from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.all_models import HSNResult, ProductCategory
from app.models.schemas import HSNRequest, HSNResponse, ProductCategoryCreate, ProductCategoryResponse
from typing import List

router = APIRouter()

@router.post("/classify", response_model=HSNResponse)
def classify_product(request: HSNRequest, db: Session = Depends(get_db)):
    """
    Automate the extraction of text from complex shipping files and use 
    machine learning to categorize the goods.
    """
    # Simulate AI classification logic
    description = request.product_description.lower()
    if "computer" in description or "laptop" in description:
        predicted_code = "8471.30.00"
    elif "shirt" in description or "fabric" in description:
        predicted_code = "6109.10.00"
    elif "chemical" in description:
        predicted_code = "2801.10.00"
    else:
        predicted_code = "3926.90.99"
    
    hsn_record = HSNResult(
        product_description=request.product_description,
        predicted_hsn_code=predicted_code,
        confidence_score=0.92,
        document_id=request.document_id,
        is_manual_override=False
    )
    
    db.add(hsn_record)
    db.commit()
    db.refresh(hsn_record)
    
    return hsn_record

@router.post("/categories", response_model=ProductCategoryResponse)
def create_custom_category(category: ProductCategoryCreate, db: Session = Depends(get_db)):
    """
    Allows administrators to manually 'add our own product category' to help assess risk effectively.
    """
    db_category = ProductCategory(**category.model_dump(), is_manual=True)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

@router.get("/categories", response_model=List[ProductCategoryResponse])
def list_categories(db: Session = Depends(get_db)):
    return db.query(ProductCategory).all()

@router.post("/override/{hsn_result_id}", response_model=HSNResponse)
def manual_override_hsn(hsn_result_id: int, new_category_id: int, db: Session = Depends(get_db)):
    """
    Enables administrators to override automated AI classification for risk management.
    """
    hsn_record = db.query(HSNResult).filter(HSNResult.id == hsn_result_id).first()
    if not hsn_record:
        raise HTTPException(status_code=404, detail="HSN result not found")
    
    hsn_record.product_category_id = new_category_id
    hsn_record.is_manual_override = True
    db.commit()
    db.refresh(hsn_record)
    return hsn_record
