from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

class Shipment(Base):
    __tablename__ = "shipments"
    id = Column(Integer, primary_key=True, index=True)
    tracking_number = Column(String, unique=True, index=True)
    booking_number = Column(String, unique=True, index=True, nullable=True)
    bl_number = Column(String, unique=True, index=True, nullable=True)
    container_number = Column(String, unique=True, index=True, nullable=True)
    
    origin_country = Column(String)
    destination_country = Column(String)
    status = Column(String)
    
    carrier = Column(String, nullable=True)
    vessel_name = Column(String, nullable=True)
    estimated_arrival = Column(DateTime(timezone=True), nullable=True)
    
    current_latitude = Column(Float, nullable=True)
    current_longitude = Column(Float, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    last_updated = Column(DateTime(timezone=True), onupdate=func.now())
    user_id = Column(Integer, ForeignKey("users.id"))
    
    updates = relationship("ShipmentUpdate", back_populates="shipment")

class ShipmentUpdate(Base):
    __tablename__ = "shipment_updates"
    id = Column(Integer, primary_key=True, index=True)
    shipment_id = Column(Integer, ForeignKey("shipments.id"))
    status = Column(String)
    location = Column(String)
    description = Column(String)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    
    shipment = relationship("Shipment", back_populates="updates")

class HSNResult(Base):
    __tablename__ = "hsn_results"
    id = Column(Integer, primary_key=True, index=True)
    product_description = Column(String)
    predicted_hsn_code = Column(String)
    confidence_score = Column(Float)
    is_manual_override = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class ProductCategory(Base):
    __tablename__ = "product_categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(String)
    is_manual = Column(Boolean, default=False)
