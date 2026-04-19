from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db
from . import service

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/summary")
async def get_summary(
    start_date: str = None, 
    end_date: str = None, 
    db: AsyncSession = Depends(get_db)
):
    return await service.get_dashboard_summary(db, start_date=start_date, end_date=end_date)

@router.get("/risk")
async def get_risk(db: AsyncSession = Depends(get_db)):
    return await service.get_risk_analytics(db)

@router.get("/hsn")
async def get_hsn(db: AsyncSession = Depends(get_db)):
    return await service.get_hsn_analytics(db)
