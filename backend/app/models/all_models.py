from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Boolean
from sqlalchemy.sql import func
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
    status = Column(String) # e.g., "At Port", "In Transit", "Delivered"
    carrier = Column(String, nullable=True)
    vessel_name = Column(String, nullable=True)
    
    estimated_arrival = Column(DateTime(timezone=True), nullable=True)
    current_latitude = Column(Float, nullable=True)
    current_longitude = Column(Float, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    last_updated = Column(DateTime(timezone=True), onupdate=func.now())
    user_id = Column(Integer, ForeignKey("users.id"))

class Document(Base):
    __tablename__ = "documents"
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    document_type = Column(String) # Invoice, Bill of Lading, etc.
    s3_url = Column(String)
    extracted_data = Column(String) # Could be JSON in real implementation
    shipment_id = Column(Integer, ForeignKey("shipments.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class HSNResult(Base):
    __tablename__ = "hsn_results"
    id = Column(Integer, primary_key=True, index=True)
    product_description = Column(String)
    predicted_hsn_code = Column(String)
    confidence_score = Column(Float)
    document_id = Column(Integer, ForeignKey("documents.id"))
    product_category_id = Column(Integer, ForeignKey("product_categories.id"), nullable=True)
    is_manual_override = Column(Boolean, default=False)

class Duty(Base):
    __tablename__ = "duties"
    id = Column(Integer, primary_key=True, index=True)
    shipment_id = Column(Integer, ForeignKey("shipments.id"))
    total_duty = Column(Float)
    tax_breakdown = Column(String) # JSON breakdown of taxes
    currency = Column(String, default="USD")

class ProductCategory(Base):
    __tablename__ = "product_categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    is_manual = Column(Boolean, default=False)
    risk_level = Column(String, default="LOW")

class FinancialAnalytics(Base):
    __tablename__ = "financial_analytics"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime(timezone=True), server_default=func.now())
    total_revenue = Column(Float, default=0.0)
    paid_amounts = Column(Float, default=0.0)
    pending_amounts = Column(Float, default=0.0)

class ProductPerformance(Base):
    __tablename__ = "product_performance"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime(timezone=True), server_default=func.now())
    product_category_id = Column(Integer, ForeignKey("product_categories.id"))
    revenue_generated = Column(Float, default=0.0)
    shipment_count = Column(Integer, default=0)
