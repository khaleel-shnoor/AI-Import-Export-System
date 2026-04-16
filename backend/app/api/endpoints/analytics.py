from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.all_models import FinancialAnalytics, ProductPerformance, ProductCategory
from datetime import datetime

router = APIRouter()

@router.get("/summary")
def get_financial_summary(db: Session = Depends(get_db)):
    """
    Internal dashboard logic.
    Calculates total revenue, paid vs pending, and product performance metrics.
    """
    # In a real implementation, we would aggregate from Shipments/Payments tables
    # For now, we return structured mock data representing the summary dashboard
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
            {"category": "Chemicals", "revenue": 200000, "count": 45, "is_high_risk": True},
            {"category": "Automotive", "revenue": 300000, "count": 80, "is_high_risk": False}
        ],
        "time_series_data": [
            {"month": "January", "revenue": 280000, "vessels_tracked": 12},
            {"month": "February", "revenue": 320000, "vessels_tracked": 15},
            {"month": "March", "revenue": 350000, "vessels_tracked": 18},
            {"month": "April", "revenue": 300000, "vessels_tracked": 14}
        ]
    }
