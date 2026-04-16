from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.all_models import HSNResult, ProductCategory
from app.models.schemas import HSNRequest, HSNResponse, ProductCategoryCreate, ProductCategoryResponse
from typing import List

router = APIRouter()

@router.post("/classify", response_model=HSNResponse)
def classify_product(request: HSNRequest, db: Session = Depends(get_db)):
    description = request.product_description.lower()
    predicted_code = "8471.30.00" if "computer" in description else "3926.90.99"
    
    hsn_record = HSNResult(
        product_description=request.product_description,
        predicted_hsn_code=predicted_code,
        confidence_score=0.92,
        is_manual_override=False
    )
    db.add(hsn_record)
    db.commit()
    db.refresh(hsn_record)
    return hsn_record

@router.get("/classifications", response_model=List[HSNResponse])
def list_classifications(db: Session = Depends(get_db)):
    return db.query(HSNResult).order_by(HSNResult.id.desc()).all()

@router.post("/categories", response_model=ProductCategoryResponse)
def create_custom_category(category: ProductCategoryCreate, db: Session = Depends(get_db)):
    db_category = ProductCategory(**category.model_dump(), is_manual=True)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category
