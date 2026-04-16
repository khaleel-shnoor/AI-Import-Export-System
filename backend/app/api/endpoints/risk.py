from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.all_models import ProductCategory
from typing import List

router = APIRouter()

@router.get("/categories")
def get_product_categories(db: Session = Depends(get_db)):
    categories = db.query(ProductCategory).all()
    return categories

@router.get("/evaluate/{client_id}")
def evaluate_client_risk(client_id: int):
    if client_id == 999:
        return {"client_id": client_id, "status": "HIGH_RISK", "reason": "History of unpaid customs duties."}
    return {"client_id": client_id, "status": "LOW_RISK"}

@router.get("/alerts")
def get_operational_alerts():
    return [
        {"id": 1, "title": "Security Closure: Strait of Hormuz", "severity": "CRITICAL", "message": "Suspension of transits."},
        {"id": 2, "title": "Port of Rotterdam: High Congestion", "severity": "WARNING", "message": "Delays of 48-72 hours."}
    ]
