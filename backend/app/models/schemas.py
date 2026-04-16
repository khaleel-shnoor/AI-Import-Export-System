from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class ShipmentBase(BaseModel):
    tracking_number: str
    booking_number: Optional[str] = None
    bl_number: Optional[str] = None
    container_number: Optional[str] = None
    origin_country: str
    destination_country: str
    status: str
    carrier: Optional[str] = None
    vessel_name: Optional[str] = None
    estimated_arrival: Optional[datetime] = None
    current_latitude: Optional[float] = None
    current_longitude: Optional[float] = None

class ShipmentCreate(ShipmentBase):
    pass

class ShipmentResponse(ShipmentBase):
    id: int
    created_at: datetime
    last_updated: Optional[datetime] = None
    user_id: Optional[int]

    class Config:
        from_attributes = True

class DocumentResponse(BaseModel):
    id: int
    filename: str
    document_type: str
    s3_url: Optional[str]
    extracted_data: Optional[str]
    shipment_id: Optional[int]
    created_at: datetime

    class Config:
        from_attributes = True

class HSNRequest(BaseModel):
    product_description: str
    document_id: Optional[int] = None

class HSNResponse(BaseModel):
    id: int
    product_description: str
    predicted_hsn_code: str
    confidence_score: float
    is_manual_override: bool

    class Config:
        from_attributes = True

class DutyRequest(BaseModel):
    hsn_code: str
    origin_country: str
    destination_country: str
    declared_value: float

class DutyResponse(BaseModel):
    hsn_code: str
    total_duty: float
    tax_breakdown: str
    currency: str

class AnalyticsResponse(BaseModel):
    total_revenue: float
    paid_amounts: float
    pending_amounts: float

class ProductCategoryCreate(BaseModel):
    name: str
    description: Optional[str] = None
    risk_level: str = "LOW"

class ProductCategoryResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    is_manual: bool
    risk_level: str

    class Config:
        from_attributes = True
