from sqlalchemy import Column, String, Float, Boolean, DateTime
from datetime import datetime
from app.database import Base

class Batch(Base):
    __tablename__ = "batches"

    id = Column(String, primary_key=True, index=True) # e.g. 'HC-AP-2026-0001'
    batch_id = Column(String, unique=True, index=True, nullable=False)
    source_hives = Column(String, nullable=False) # Comma-separated hive IDs
    beekeeper_id = Column(String, nullable=False)
    beekeeper_name = Column(String, nullable=False)
    cluster = Column(String, nullable=False)
    harvest_date = Column(String, nullable=False)
    quantity_kg = Column(Float, nullable=False)
    floral_source = Column(String, nullable=False)
    location = Column(String, nullable=False)
    collector = Column(String, nullable=False)
    notes = Column(String, nullable=True)
    quality_status = Column(String, default="IN_TESTING") # 'IN_TESTING', 'PASSED_KVIC_TEST', 'REJECTED'
    processing_status = Column(String, default="HARVESTED") # 'HARVESTED', 'PROCESSING', 'PACKAGED', 'FOR_SALE'
    blockchain_status = Column(String, default="CONFIRMED_ON_CHAIN")
    purity_score = Column(String, default="In Testing")
    moisture_content = Column(String, default="Pending Lab")
    hmf_ppm = Column(String, default="Pending")
    c4_sugar_test = Column(String, default="In Progress")
    qr_code_url = Column(String, nullable=True)
    price_per_kg = Column(Float, default=650.0)
    is_listed_on_marketplace = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
