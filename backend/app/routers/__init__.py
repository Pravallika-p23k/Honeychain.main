from app.routers.auth import router as auth_router
from app.routers.beekeepers import router as beekeepers_router
from app.routers.hives import router as hives_router
from app.routers.telemetry import router as telemetry_router
from app.routers.harvests import router as harvests_router
from app.routers.batches import router as batches_router
from app.routers.verification import router as verification_router
from app.routers.alerts import router as alerts_router
from app.routers.stats import router as stats_router

__all__ = [
    "auth_router",
    "beekeepers_router",
    "hives_router",
    "telemetry_router",
    "harvests_router",
    "batches_router",
    "verification_router",
    "alerts_router",
    "stats_router"
]
