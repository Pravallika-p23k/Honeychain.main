from sqlalchemy import Column, String, Boolean, DateTime
from datetime import datetime
from app.database import Base

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(String, primary_key=True, index=True) # e.g. 'ALT-2026-101'
    hive_id = Column(String, nullable=True)
    batch_id = Column(String, nullable=True)
    title = Column(String, nullable=False)
    type = Column(String, nullable=False) # e.g. 'TEMP_HUMIDITY_HIGH'
    severity = Column(String, nullable=False) # 'CRITICAL', 'WARNING', 'INFO'
    message = Column(String, nullable=False)
    timestamp = Column(String, nullable=False)
    read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
