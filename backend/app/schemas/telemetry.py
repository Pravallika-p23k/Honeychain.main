from pydantic import BaseModel
from typing import Optional

class TelemetryIngressSchema(BaseModel):
    hive_id: str
    temperature: float
    humidity: float
    weight: float
    sound_frequency: Optional[int] = 210
    activity_score: Optional[int] = 80
    battery_level: Optional[int] = 90

class TelemetryResponseSchema(BaseModel):
    id: int
    hive_id: str
    timestamp: str
    temperature: float
    humidity: float
    weight: float
    sound_frequency: int
    activity_score: int
    battery_level: int

    class Config:
        from_attributes = True
