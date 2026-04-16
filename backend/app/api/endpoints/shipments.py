from fastapi import APIRouter, Depends, HTTPException
from app.models.schemas import ShipmentCreate, ShipmentResponse, ShipmentUpdateCreate, ShipmentUpdateResponse
from app.models.all_models import Shipment, ShipmentUpdate, HSNResult
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.db.database import get_db
import json
import uuid
from datetime import datetime, timedelta
from typing import List, Optional

router = APIRouter()

@router.get("/", response_model=List[ShipmentResponse])
def list_shipments(db: Session = Depends(get_db)):
    return db.query(Shipment).all()

@router.post("/", response_model=ShipmentResponse)
def create_shipment(shipment: ShipmentCreate, db: Session = Depends(get_db)):
    if not shipment.tracking_number:
        shipment.tracking_number = f"SHN-{uuid.uuid4().hex[:8].upper()}"
    
    db_shipment = Shipment(**shipment.model_dump())
    db.add(db_shipment)
    db.commit()
    db.refresh(db_shipment)
    
    # Create initial update
    initial_update = ShipmentUpdate(
        shipment_id=db_shipment.id,
        status=db_shipment.status,
        location="Origin Terminal",
        description="Shipment recorded in system."
    )
    db.add(initial_update)
    db.commit()
    db.refresh(db_shipment)
    
    return db_shipment

@router.post("/auto-create/{hsn_id}", response_model=ShipmentResponse)
def auto_create_from_hsn(hsn_id: int, db: Session = Depends(get_db)):
    hsn_record = db.query(HSNResult).filter(HSNResult.id == hsn_id).first()
    if not hsn_record:
        raise HTTPException(status_code=404, detail="HSN record not found")
    
    shipment_data = {
        "tracking_number": f"SHN-{uuid.uuid4().hex[:8].upper()}",
        "status": "Order Processed",
        "origin_country": "Auto-detect (Pending)",
        "destination_country": "Pending",
        "vessel_name": "TBA",
        "carrier": "Shnoor International Logistics",
        "container_number": f"CONT-{uuid.uuid4().hex[:6].upper()}"
    }
    
    db_shipment = Shipment(**shipment_data)
    db.add(db_shipment)
    db.commit()
    db.refresh(db_shipment)
    
    # Add initial update with HSN info
    initial_update = ShipmentUpdate(
        shipment_id=db_shipment.id,
        status="HSN Classified",
        location="Processing Center",
        description=f"Auto-generated from HSN classification of: {hsn_record.product_description}"
    )
    db.add(initial_update)
    db.commit()
    db.refresh(db_shipment)
    
    return db_shipment

@router.post("/{shipment_id}/updates", response_model=ShipmentUpdateResponse)
def add_tracking_update(shipment_id: int, update: ShipmentUpdateCreate, db: Session = Depends(get_db)):
    shipment = db.query(Shipment).filter(Shipment.id == shipment_id).first()
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    
    db_update = ShipmentUpdate(shipment_id=shipment_id, **update.model_dump())
    
    # Update shipment main state
    shipment.status = update.status
    shipment.last_updated = datetime.now()
    
    db.add(db_update)
    db.commit()
    db.refresh(db_update)
    return db_update

@router.get("/track/{identifier}", response_model=ShipmentResponse)
def track_shipment(identifier: str, db: Session = Depends(get_db)):
    shipment = db.query(Shipment).filter(
        or_(
            Shipment.tracking_number == identifier,
            Shipment.booking_number == identifier,
            Shipment.bl_number == identifier,
            Shipment.container_number == identifier
        )
    ).first()
    
    if not shipment:
        # Fallback to mock only if explicitly needed for demo, 
        # but the user asked for DB storage, so let's stick to DB or 404
        raise HTTPException(status_code=404, detail="Shipment not found")
    
    return shipment

@router.get("/live-position/{identifier}")
def get_live_position(identifier: str, db: Session = Depends(get_db)):
    shipment = track_shipment(identifier, db)
    return {
        "identifier": identifier,
        "latitude": shipment.current_latitude,
        "longitude": shipment.current_longitude,
        "vessel_name": shipment.vessel_name,
        "status": shipment.status,
        "eta": shipment.estimated_arrival
    }

@router.get("/schedules")
def search_schedules(origin: str, destination: str, departure_date: str):
    return [
        {
            "vessel": "VALPARAISO EXPRESS",
            "departure": departure_date,
            "arrival": (datetime.strptime(departure_date, "%Y-%m-%d") + timedelta(days=14)).strftime("%Y-%m-%d"),
            "transit_days": 14,
            "route": f"{origin} -> Suez Canal -> {destination}"
        }
    ]

@router.post("/booking")
def create_booking(shipment_data: ShipmentCreate, db: Session = Depends(get_db)):
    """
    Booking: Customers formally secure space on the vessel using the digital Booking portal.
    """
    # In real app, this would assign a Booking Number and check capacity
    db_shipment = Shipment(**shipment_data.model_dump())
    db_shipment.booking_number = f"BK-{datetime.now().strftime('%Y%m%d%H%M%S')}"
    db_shipment.status = "Booking Confirmed"
    
    db.add(db_shipment)
    db.commit()
    db.refresh(db_shipment)
    return {
        "message": "Booking successful",
        "booking_number": db_shipment.booking_number,
        "shipment_details": db_shipment
    }
