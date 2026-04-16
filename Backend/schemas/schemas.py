from pydantic import BaseModel
from typing import Optional,Dict,Any

class DocumentResponse(BaseModel):
    id:int
    status:str
    message:str
    class Config:
        from_attributes=True

class ExtractedInvoiceData(BaseModel):
    product_name:str
    quantity:int
    price:float
    country:str
