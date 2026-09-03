from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.beekeeper import Beekeeper
from app.schemas.beekeeper import BeekeeperCreateSchema, BeekeeperResponseSchema

router = APIRouter(prefix="/beekeepers", tags=["Beekeepers"])

@router.get("", response_model=List[BeekeeperResponseSchema])
def get_beekeepers(db: Session = Depends(get_db)):
    return db.query(Beekeeper).all()

@router.post("", response_model=BeekeeperResponseSchema, status_code=status.HTTP_201_CREATED)
def create_beekeeper(bk_in: BeekeeperCreateSchema, db: Session = Depends(get_db)):
    bk_id = f"RBH-{int(db.query(Beekeeper).count()) + 5000}"
    beekeeper = Beekeeper(
        id=bk_id,
        name=bk_in.name,
        cluster=bk_in.cluster,
        village=bk_in.village or "Cluster Village",
        hives_count=bk_in.hives_count or 0,
        annual_prod_kg=0.0,
        verification_status="VERIFIED",
        phone=bk_in.phone or "+91 98765 43210"
    )
    db.add(beekeeper)
    db.commit()
    db.refresh(beekeeper)
    return beekeeper

@router.put("/{beekeeper_id}/verify", response_model=BeekeeperResponseSchema)
def toggle_verification(beekeeper_id: str, db: Session = Depends(get_db)):
    bk = db.query(Beekeeper).filter(Beekeeper.id == beekeeper_id).first()
    if not bk:
        raise HTTPException(status_code=404, detail="Beekeeper not found")
    
    bk.verification_status = "PENDING" if bk.verification_status == "VERIFIED" else "VERIFIED"
    db.commit()
    db.refresh(bk)
    return bk
