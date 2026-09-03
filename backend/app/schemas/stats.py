from pydantic import BaseModel
from typing import List, Dict, Any

class GovStatsResponseSchema(BaseModel):
    total_beekeepers: int
    total_smart_hives: int
    active_clusters_count: int
    total_honey_yield_mt: float
    verified_batches_count: int
    quality_alerts_count: int
    purity_compliance_pct: float
    clusters: List[Dict[str, Any]]
