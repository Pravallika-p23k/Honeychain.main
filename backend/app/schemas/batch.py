from pydantic import BaseModel
from typing import Optional, List

class QualityAuditSchema(BaseModel):
    purity_score: Optional[str] = "99.4%"
    moisture_content: Optional[str] = "17.1%"
    hmf_ppm: Optional[str] = "12 mg/kg"
    c4_sugar_test: Optional[str] = "Passed Negative (<7%)"

class BatchMarketplaceToggleSchema(BaseModel):
    is_listed_on_marketplace: bool
    price_per_kg: Optional[float] = 650.0

class BatchResponseSchema(BaseModel):
    id: str
    batch_id: str
    source_hives: str
    beekeeper_id: str
    beekeeper_name: str
    cluster: str
    harvest_date: str
    quantity_kg: float
    floral_source: str
    location: str
    collector: str
    notes: Optional[str] = None
    quality_status: str
    processing_status: str
    blockchain_status: str
    purity_score: str
    moisture_content: str
    hmf_ppm: str
    c4_sugar_test: str
    qr_code_url: Optional[str] = None
    price_per_kg: float
    is_listed_on_marketplace: bool

    class Config:
        from_attributes = True
