from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.alert import Alert
from app.schemas.alert import AlertCreateSchema, AlertResponseSchema
from datetime import datetime

router = APIRouter(prefix="/alerts", tags=["System Alerts"])

@router.get("", response_model=List[AlertResponseSchema])
def get_alerts(severity: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Alert)
    if severity and severity != 'ALL':
        query = query.filter(Alert.severity == severity)
    return query.order_by(Alert.created_at.desc()).all()

@router.post("", response_model=AlertResponseSchema, status_code=status.HTTP_201_CREATED)
def create_alert(alert_in: AlertCreateSchema, db: Session = Depends(get_db)):
    id = f"ALT-{int(datetime.utcnow().timestamp())}"
    now_str = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")

    alert = Alert(
        id=id,
        hive_id=alert_in.hive_id,
        batch_id=alert_in.batch_id,
        title=alert_in.title,
        type=alert_in.type,
        severity=alert_in.severity,
        message=alert_in.message,
        timestamp=now_str,
        read=False
    )
    db.add(alert)
    db.commit()
    db.refresh(alert)
    return alert

@router.put("/{alert_id}/dismiss", response_model=AlertResponseSchema)
def dismiss_alert(alert_id: str, db: Session = Depends(get_db)):
    a = db.query(Alert).filter(Alert.id == alert_id).first()
    if not a:
        raise HTTPException(status_code=404, detail="Alert not found")
    
    a.read = True
    db.commit()
    db.refresh(a)
    return a
