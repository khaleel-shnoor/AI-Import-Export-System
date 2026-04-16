from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.all_models import ProductCategory
from typing import List

router = APIRouter()

@router.get("/categories", response_model=List[dict])
def get_product_categories(db: Session = Depends(get_db)):
    categories = db.query(ProductCategory).all()
    return [{"id": c.id, "name": c.name, "risk_level": c.risk_level, "is_manual": c.is_manual} for c in categories]

@router.post("/categories/manual")
def add_custom_category(name: str, risk_level: str, db: Session = Depends(get_db)):
    """Allow administrators to manually add their own product category (Module 3/4 spec)"""
    new_cat = ProductCategory(
        name=name,
        description=f"Manual category: {name}",
        is_manual=True,
        risk_level=risk_level
    )
    db.add(new_cat)
    db.commit()
    db.refresh(new_cat)
    return {"message": "Custom category added successfully", "category_id": new_cat.id}

@router.get("/evaluate/{client_id}")
def evaluate_client_risk(client_id: int):
    """
    Mock endpoint for Risk Assessment.
    Evaluates client risk histories based on past operational data.
    """
    # Mock logic based on client ID
    if client_id == 999:
        return {"client_id": client_id, "status": "HIGH_RISK", "reason": "History of unpaid customs duties."}
        
    return {"client_id": client_id, "status": "LOW_RISK", "advisories": []}

@router.get("/alerts")
def get_operational_alerts():
    """
    Powers the 'Live Ticker' and 'Operational Updates' section on the frontend.
    Provides warnings of global issues like security closures or port contingencies.
    """
    return [
        {
            "id": 1,
            "title": "Security Closure: Strait of Hormuz",
            "severity": "CRITICAL",
            "message": "Suspension of Strait of Hormuz Transits Due to Security Closure. Contingency measures in place.",
            "timestamp": "2026-04-16T10:00:00Z"
        },
        {
            "id": 2,
            "title": "Port of Rotterdam: High Congestion",
            "severity": "WARNING",
            "message": "Labor strikes leading to vessel delays of 48-72 hours. Last-mile planning may be affected.",
            "timestamp": "2026-04-16T08:30:00Z"
        },
        {
            "id": 3,
            "title": "Suez Canal: Normal Flow",
            "severity": "INFO",
            "message": "Transit times are currently normal. No disruptions reported.",
            "timestamp": "2026-04-16T06:00:00Z"
        }
    ]
