from sqlalchemy import Column, String, Integer, Float, DateTime
from datetime import datetime
from app.database import Base

class Beekeeper(Base):
    __tablename__ = "beekeepers"

    id = Column(String, primary_key=True, index=True) # e.g. 'RBH-4821'
    user_id = Column(String, nullable=True)
    name = Column(String, nullable=False)
    cluster = Column(String, nullable=False)
    village = Column(String, nullable=True)
    hives_count = Column(Integer, default=0)
    annual_prod_kg = Column(Float, default=0.0)
    verification_status = Column(String, default="VERIFIED") # 'VERIFIED', 'PENDING'
    reg_date = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
