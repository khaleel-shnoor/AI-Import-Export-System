from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class Token(BaseModel):
    access_token: str
    token_type: str

class UserBase(BaseModel):
    email: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    class Config:
        from_attributes = True

class ShipmentBase(BaseModel):
    tracking_number: Optional[str] = None
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

class ShipmentUpdateCreate(BaseModel):
    status: str
    location: str
    description: str

class ShipmentCreate(ShipmentBase):
    pass

class ShipmentUpdateResponse(BaseModel):
    id: int
    status: str
    location: str
    description: str
    timestamp: datetime
    class Config:
        from_attributes = True

class ShipmentResponse(ShipmentBase):
    id: int
    tracking_number: str
    created_at: datetime
    last_updated: Optional[datetime] = None
    user_id: Optional[int] = None
    updates: List[ShipmentUpdateResponse] = []
    class Config:
        from_attributes = True

class HSNRequest(BaseModel):
    product_description: str

class HSNResponse(BaseModel):
    id: int
    product_description: str
    predicted_hsn_code: str
    confidence_score: float
    is_manual_override: bool
    class Config:
        from_attributes = True

class ProductCategoryCreate(BaseModel):
    name: str
    description: Optional[str] = None

class ProductCategoryResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    is_manual: bool
    class Config:
        from_attributes = True
