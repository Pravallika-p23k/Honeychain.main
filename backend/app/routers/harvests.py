from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.harvest import Harvest
from app.models.batch import Batch
from app.schemas.harvest import HarvestCreateSchema, HarvestResponseSchema
from app.schemas.batch import BatchResponseSchema
from datetime import datetime

router = APIRouter(prefix="/harvests", tags=["Honey Harvests"])

@router.get("", response_model=List[HarvestResponseSchema])
def get_harvests(db: Session = Depends(get_db)):
    return db.query(Harvest).all()

@router.post("", response_model=BatchResponseSchema, status_code=status.HTTP_201_CREATED)
def record_harvest(harvest_in: HarvestCreateSchema, db: Session = Depends(get_db)):
    # Save Harvest Log
    harvest = Harvest(
        hive_id=harvest_in.hive_id,
        harvest_date=harvest_in.harvest_date,
        quantity_kg=harvest_in.quantity_kg,
        floral_source=harvest_in.floral_source,
        location=harvest_in.location,
        collector=harvest_in.collector,
        notes=harvest_in.notes
    )
    db.add(harvest)

    # Generate Government Batch ID
    count = db.query(Batch).count() + 1
    seq = str(count).zfill(4)
    batch_id = f"HC-AP-2026-{seq}"

    qr_url = f"https://api.qrserver.com/v1/create-qr-code/?size=180x180&data={batch_id}"

    batch = Batch(
        id=batch_id,
        batch_id=batch_id,
        source_hives=harvest_in.hive_id,
        beekeeper_id="RBH-4821",
        beekeeper_name=harvest_in.collector,
        cluster="Andhra Pradesh - Chittoor Cluster",
        harvest_date=harvest_in.harvest_date,
        quantity_kg=harvest_in.quantity_kg,
        floral_source=harvest_in.floral_source,
        location=harvest_in.location,
        collector=harvest_in.collector,
        notes=harvest_in.notes or "Harvest recorded via Honey Chain Backend",
        quality_status="IN_TESTING",
        processing_status="HARVESTED",
        blockchain_status="CONFIRMED_ON_CHAIN",
        purity_score="In Testing",
        moisture_content="In Testing",
        hmf_ppm="Pending",
        c4_sugar_test="Pending",
        qr_code_url=qr_url,
        price_per_kg=harvest_in.estimated_price or 650.0,
        is_listed_on_marketplace=False
    )
    db.add(batch)
    db.commit()
    db.refresh(batch)
    return batch
