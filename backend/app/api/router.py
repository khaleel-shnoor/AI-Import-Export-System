from fastapi import APIRouter

from .endpoints import documents, hsn, duty, risk, auth, analytics, shipments

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(documents.router, prefix="/documents", tags=["Document Intelligence"])
api_router.include_router(hsn.router, prefix="/hsn", tags=["HSN Classification"])
api_router.include_router(duty.router, prefix="/duty", tags=["Duty & Tax Engine"])
api_router.include_router(risk.router, prefix="/risk", tags=["Risk Assessment Engine"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Analytics Dashboard"])
api_router.include_router(shipments.router, prefix="/shipments", tags=["Shipment Routing & Tracking"])
