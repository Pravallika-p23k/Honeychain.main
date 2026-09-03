from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.batch import Batch
from app.schemas.batch import BatchResponseSchema

router = APIRouter(prefix="/verify", tags=["Public Verification"])

@router.get("/{batch_id}", response_model=BatchResponseSchema)
def public_verify_batch(batch_id: str, db: Session = Depends(get_db)):
    """
    Public Endpoint: Allows any consumer to scan QR code or search Batch ID
    to verify authenticity, origin, and KVIC lab certificates without logging in.
    """
    b = db.query(Batch).filter(Batch.batch_id == batch_id).first()
    if not b:
        raise HTTPException(status_code=404, detail="Honey Batch ID not found in KVIC Registry")
    return b
