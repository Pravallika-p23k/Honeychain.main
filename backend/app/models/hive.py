from sqlalchemy import Column, String, Integer, Float, DateTime
from datetime import datetime
from app.database import Base

class Hive(Base):
    __tablename__ = "hives"

    id = Column(String, primary_key=True, index=True) # e.g. 'HC-AP-017'
    qr_id = Column(String, unique=True, index=True, nullable=False)
    location = Column(String, nullable=False)
    colony_status = Column(String, default="HEALTHY") # 'HEALTHY', 'ATTENTION_REQUIRED', 'SWARMING_RISK'
    health_score = Column(Integer, default=90)
    temperature = Column(Float, default=34.5)
    humidity = Column(Float, default=55.0)
    weight = Column(Float, default=40.0)
    activity = Column(Integer, default=85)
    battery = Column(Integer, default=95)
    bee_species = Column(String, default="Apis cerana indica")
    queen_info = Column(String, nullable=True)
    last_inspection = Column(String, nullable=True)
    installation_date = Column(String, nullable=True)
    weight_drop_24h = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)
