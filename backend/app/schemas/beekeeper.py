from pydantic import BaseModel
from typing import Optional

class BeekeeperCreateSchema(BaseModel):
    name: str
    cluster: str
    village: Optional[str] = None
    hives_count: Optional[int] = 0
    phone: Optional[str] = None

class BeekeeperResponseSchema(BaseModel):
    id: str
    name: str
    cluster: str
    village: Optional[str] = None
    hives_count: int
    annual_prod_kg: float
    verification_status: str
    reg_date: Optional[str] = None
    phone: Optional[str] = None

    class Config:
        from_attributes = True
