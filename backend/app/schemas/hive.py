from pydantic import BaseModel
from typing import Optional

class HiveCreateSchema(BaseModel):
    location: str
    bee_species: Optional[str] = "Apis cerana indica"
    queen_info: Optional[str] = "Queen #Q-2026-NEW"
    initial_weight: Optional[float] = 35.0

class HiveResponseSchema(BaseModel):
    id: str
    qr_id: str
    location: str
    colony_status: str
    health_score: int
    temperature: float
    humidity: float
    weight: float
    activity: int
    battery: int
    bee_species: str
    queen_info: Optional[str] = None
    last_inspection: Optional[str] = None
    installation_date: Optional[str] = None
    weight_drop_24h: float = 0.0

    class Config:
        from_attributes = True
