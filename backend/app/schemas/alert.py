from pydantic import BaseModel
from typing import Optional

class AlertCreateSchema(BaseModel):
    title: str
    type: str
    severity: str
    message: str
    hive_id: Optional[str] = None
    batch_id: Optional[str] = None

class AlertResponseSchema(BaseModel):
    id: str
    hive_id: Optional[str] = None
    batch_id: Optional[str] = None
    title: str
    type: str
    severity: str
    message: str
    timestamp: str
    read: bool

    class Config:
        from_attributes = True
