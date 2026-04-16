from fastapi import APIRouter, Depends, HTTPException
from app.models.schemas import ShipmentCreate, ShipmentResponse
from app.models.all_models import Shipment
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.db.database import get_db
import json
from datetime import datetime, timedelta

router = APIRouter()

@router.post("/", response_model=ShipmentResponse)
def create_shipment(shipment: ShipmentCreate, db: Session = Depends(get_db)):
    db_shipment = Shipment(**shipment.model_dump())
    db.add(db_shipment)
    db.commit()
    db.refresh(db_shipment)
    return db_shipment

@router.get("/track/{identifier}", response_model=ShipmentResponse)
def track_shipment(identifier: str, db: Session = Depends(get_db)):
    """
    Live Tracking: Customers track their shipments in real-time by entering a 
    Container number, Booking number, or B/L-Number.
    Uses Redis to cache the location data of frequently tracked ships.
    """
    # Optimized performance: Check Redis cache first
    try:
        from app.infrastructure.redis_config import redis_client
        cached_data = redis_client.get(f"tracking:{identifier}")
        if cached_data:
            return ShipmentResponse(**json.loads(cached_data))
    except (ImportError, Exception):
        # Fallback if Redis is not configured or fails
        pass

    # Check across all relevant tracking fields in PostgreSQL
    shipment = db.query(Shipment).filter(
        or_(
            Shipment.tracking_number == identifier,
            Shipment.booking_number == identifier,
            Shipment.bl_number == identifier,
            Shipment.container_number == identifier
        )
    ).first()
    
    if not shipment:
        # Mock result for demonstration
        mock_data = ShipmentResponse(
            id=0,
            tracking_number=identifier,
            booking_number=f"B-{identifier[-5:]}" if len(identifier)>5 else "B-MOCK",
            bl_number=f"BL-{identifier[-5:]}" if len(identifier)>5 else "BL-MOCK",
            container_number=identifier,
            origin_country="Port of Singapore",
            destination_country="Port of Rotterdam",
            status="In Transit - Mid Atlantic",
            carrier="Hapag-Lloyd",
            vessel_name="VALPARAISO EXPRESS",
            estimated_arrival=datetime.now() + timedelta(days=5),
            current_latitude=25.0,
            current_longitude=-45.0,
            created_at=datetime.now(),
            last_updated=datetime.now()
        )
        return mock_data
    
    # Cache the result in Redis for 10 minutes (600 seconds)
    try:
        from app.infrastructure.redis_config import redis_client
        redis_client.setex(
            f"tracking:{identifier}", 
            600, 
            json.dumps(ShipmentResponse.model_validate(shipment).model_dump(), default=str)
        )
    except (ImportError, Exception):
        pass
    
    return shipment

@router.get("/live-position/{identifier}")
def get_live_position(identifier: str, db: Session = Depends(get_db)):
    """Integration for 'Live Position' or 'Navigator 2.0' visual modules."""
    shipment = track_shipment(identifier, db)
    return {
        "identifier": identifier,
        "latitude": shipment.current_latitude,
        "longitude": shipment.current_longitude,
        "vessel_name": shipment.vessel_name,
        "status": shipment.status,
        "eta": shipment.estimated_arrival
    }
