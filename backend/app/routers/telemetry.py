from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.telemetry import Telemetry
from app.models.hive import Hive
from app.models.alert import Alert
from app.schemas.telemetry import TelemetryIngressSchema, TelemetryResponseSchema
from datetime import datetime

router = APIRouter(prefix="/telemetry", tags=["IoT Telemetry"])

@router.get("/hive/{hive_id}", response_model=List[TelemetryResponseSchema])
def get_hive_telemetry(hive_id: str, db: Session = Depends(get_db)):
    return db.query(Telemetry).filter(Telemetry.hive_id == hive_id).order_by(Telemetry.id.desc()).limit(24).all()

@router.post("", response_model=TelemetryResponseSchema, status_code=status.HTTP_201_CREATED)
def ingress_telemetry(payload: TelemetryIngressSchema, db: Session = Depends(get_db)):
    hive = db.query(Hive).filter(Hive.id == payload.hive_id).first()
    if not hive:
        raise HTTPException(status_code=404, detail="Hive node not found")

    # Update current telemetry on hive record
    hive.temperature = payload.temperature
    hive.humidity = payload.humidity
    hive.weight = payload.weight
    hive.battery = payload.battery_level or hive.battery

    # Threshold checks for auto-alerting
    if payload.temperature > 37.5:
        hive.colony_status = "ATTENTION_REQUIRED"
        alert = Alert(
            id=f"ALT-{int(datetime.utcnow().timestamp())}",
            hive_id=payload.hive_id,
            title="High Brood Temperature Warning",
            type="TEMP_HIGH",
            severity="WARNING",
            message=f"Hive {payload.hive_id} registered elevated temperature of {payload.temperature}°C",
            timestamp=datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
        )
        db.add(alert)

    now_str = datetime.utcnow().strftime("%H:%M")
    telemetry = Telemetry(
        hive_id=payload.hive_id,
        timestamp=now_str,
        temperature=payload.temperature,
        humidity=payload.humidity,
        weight=payload.weight,
        sound_frequency=payload.sound_frequency or 210,
        activity_score=payload.activity_score or 80,
        battery_level=payload.battery_level or 90
    )
    db.add(telemetry)
    db.commit()
    db.refresh(telemetry)
    return telemetry
