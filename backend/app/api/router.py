from fastapi import APIRouter
from .endpoints import auth, shipments

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["User Authentication"])
api_router.include_router(shipments.router, prefix="/shipments", tags=["Shipment Tracking & Routing"])
