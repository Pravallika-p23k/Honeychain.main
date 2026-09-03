from pydantic import BaseModel
from typing import Optional

class HarvestCreateSchema(BaseModel):
    hive_id: str
    harvest_date: str
    quantity_kg: float
    floral_source: str
    location: str
    collector: str
    notes: Optional[str] = None
    estimated_price: Optional[float] = 650.0

class HarvestResponseSchema(BaseModel):
    id: int
    hive_id: str
    harvest_date: str
    quantity_kg: float
    floral_source: str
    location: str
    collector: str
    notes: Optional[str] = None

    class Config:
        from_attributes = True
