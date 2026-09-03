from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.batch import Batch
from app.schemas.batch import BatchResponseSchema, QualityAuditSchema, BatchMarketplaceToggleSchema

router = APIRouter(prefix="/batches", tags=["Honey Batches"])

@router.get("", response_model=List[BatchResponseSchema])
def get_batches(marketplace_only: Optional[bool] = False, db: Session = Depends(get_db)):
    query = db.query(Batch)
    if marketplace_only:
        query = query.filter(Batch.is_listed_on_marketplace == True)
    return query.all()

@router.get("/{batch_id}", response_model=BatchResponseSchema)
def get_batch_by_id(batch_id: str, db: Session = Depends(get_db)):
    b = db.query(Batch).filter(Batch.batch_id == batch_id).first()
    if not b:
        raise HTTPException(status_code=404, detail="Batch ID not found")
    return b

@router.put("/{batch_id}/quality", response_model=BatchResponseSchema)
def update_batch_quality(batch_id: str, audit_in: QualityAuditSchema, approved: bool = True, db: Session = Depends(get_db)):
    b = db.query(Batch).filter(Batch.batch_id == batch_id).first()
    if not b:
        raise HTTPException(status_code=404, detail="Batch ID not found")
    
    b.quality_status = "PASSED_KVIC_TEST" if approved else "REJECTED"
    b.processing_status = "PACKAGED" if approved else "REJECTED"
    b.purity_score = audit_in.purity_score or "99.4%"
    b.moisture_content = audit_in.moisture_content or "17.1%"
    b.hmf_ppm = audit_in.hmf_ppm or "12 mg/kg"
    b.c4_sugar_test = audit_in.c4_sugar_test or "Passed Negative (<7%)"

    db.commit()
    db.refresh(b)
    return b

@router.put("/{batch_id}/marketplace", response_model=BatchResponseSchema)
def toggle_marketplace(batch_id: str, toggle: BatchMarketplaceToggleSchema, db: Session = Depends(get_db)):
    b = db.query(Batch).filter(Batch.batch_id == batch_id).first()
    if not b:
        raise HTTPException(status_code=404, detail="Batch ID not found")
    
    b.is_listed_on_marketplace = toggle.is_listed_on_marketplace
    if toggle.price_per_kg:
        b.price_per_kg = toggle.price_per_kg

    db.commit()
    db.refresh(b)
    return b
