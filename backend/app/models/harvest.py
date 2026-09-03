from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from app.database import Base

class Harvest(Base):
    __tablename__ = "harvests"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    hive_id = Column(String, index=True, nullable=False)
    harvest_date = Column(String, nullable=False)
    quantity_kg = Column(Float, nullable=False)
    floral_source = Column(String, nullable=False)
    location = Column(String, nullable=False)
    collector = Column(String, nullable=False)
    notes = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
