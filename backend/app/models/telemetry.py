from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from app.database import Base

class Telemetry(Base):
    __tablename__ = "telemetries"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    hive_id = Column(String, index=True, nullable=False)
    timestamp = Column(String, nullable=False) # e.g. '10:00 AM' or ISO
    temperature = Column(Float, nullable=False)
    humidity = Column(Float, nullable=False)
    weight = Column(Float, nullable=False)
    sound_frequency = Column(Integer, default=210)
    activity_score = Column(Integer, default=80)
    battery_level = Column(Integer, default=90)
    recorded_at = Column(DateTime, default=datetime.utcnow)
