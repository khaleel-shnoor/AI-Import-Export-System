from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from datetime import datetime

router = APIRouter()

@router.get("/summary")
def get_financial_summary(db: Session = Depends(get_db)):
    return {
        "summary": {
            "total_revenue": 1250000.0,
            "paid_amounts": 850000.0,
            "pending_amounts": 400000.0,
            "currency": "USD",
            "last_updated": datetime.now()
        },
        "product_performance": [
            {"category": "Electronics", "revenue": 450000, "count": 120, "is_high_risk": False},
            {"category": "Textiles", "revenue": 300000, "count": 250, "is_high_risk": False},
            {"category": "Chemicals", "revenue": 200000, "count": 45, "is_high_risk": True}
        ],
        "time_series_data": [
            {"month": "January", "revenue": 280000},
            {"month": "February", "revenue": 320000},
            {"month": "March", "revenue": 350000}
        ]
    }
