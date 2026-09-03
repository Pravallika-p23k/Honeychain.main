from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.hive import Hive
from app.schemas.hive import HiveCreateSchema, HiveResponseSchema
from datetime import datetime

router = APIRouter(prefix="/hives", tags=["Hives"])

@router.get("", response_model=List[HiveResponseSchema])
def get_hives(status: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Hive)
    if status and status != 'ALL':
        query = query.filter(Hive.colony_status == status)
    return query.all()

@router.get("/{hive_id}", response_model=HiveResponseSchema)
def get_hive_detail(hive_id: str, db: Session = Depends(get_db)):
    hive = db.query(Hive).filter(Hive.id == hive_id).first()
    if not hive:
        raise HTTPException(status_code=404, detail="Hive node not found")
    return hive

@router.post("", response_model=HiveResponseSchema, status_code=status.HTTP_201_CREATED)
def register_hive(hive_in: HiveCreateSchema, db: Session = Depends(get_db)):
    count = db.query(Hive).count() + 1
    id = f"HC-AP-0{count + 20}"
    qr_id = f"QR-{id}-100"
    today = datetime.utcnow().strftime("%Y-%m-%d")

    hive = Hive(
        id=id,
        qr_id=qr_id,
        location=hive_in.location,
        colony_status="HEALTHY",
        health_score=92,
        temperature=34.5,
        humidity=55.0,
        weight=hive_in.initial_weight or 35.0,
        activity=85,
        battery=100,
        bee_species=hive_in.bee_species or "Apis cerana indica",
        queen_info=hive_in.queen_info or "Queen #Q-2026-NEW",
        last_inspection=today,
        installation_date=today
    )
    db.add(hive)
    db.commit()
    db.refresh(hive)
    return hive
