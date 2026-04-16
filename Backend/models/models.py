from sqlalchemy import Column,Integer,String,Text,JSON,DateTime,ForeignKey
from sqlalchemy.sql import func
from database import Base

class Shipment(Base):
    __tablename__ = "shipments"
    id=Column(Integer,primary_key=True,index=True)
    product_name=Column(Text)
    quantity=Column(Integer)
    unit_price=Column(Integer)
    origin_country=Column(String(50))
    status=Column(String(50),default="pending")

class Document(Base):
    __tablename__="documents"
    id=Column(Integer,primary_key=True,index=True)
    shipment_id=Column(Integer,ForeignKey("shipments.id"),nullable=True)
    file_url=Column(Text)
    status = Column(String(50), default="Processing")
    extracted_data = Column(JSON)
    created_at = Column(DateTime, default=func.now())
    
    