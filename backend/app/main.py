import os
import sys

# Ensure backend root directory is in python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base
from app.routers import (
    auth_router,
    beekeepers_router,
    hives_router,
    telemetry_router,
    harvests_router,
    batches_router,
    verification_router,
    alerts_router,
    stats_router
)

# Auto-create database tables on app startup
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"Database initialization warning: {e}")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Khadi & Village Industries Commission (KVIC) Honey Traceability REST APIs"
)

# Configure CORS Middleware for React Frontend
origins = [origin.strip() for origin in settings.ALLOWED_ORIGINS.split(",")]
origins.extend(["*", "http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for dev prototyping ease
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Router Modules
app.include_router(auth_router, prefix=settings.API_PREFIX)
app.include_router(beekeepers_router, prefix=settings.API_PREFIX)
app.include_router(hives_router, prefix=settings.API_PREFIX)
app.include_router(telemetry_router, prefix=settings.API_PREFIX)
app.include_router(harvests_router, prefix=settings.API_PREFIX)
app.include_router(batches_router, prefix=settings.API_PREFIX)
app.include_router(verification_router, prefix=settings.API_PREFIX)
app.include_router(alerts_router, prefix=settings.API_PREFIX)
app.include_router(stats_router, prefix=settings.API_PREFIX)

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "Honey Chain Backend API",
        "version": settings.VERSION,
        "docs_url": "/docs",
        "disclaimer": "Government of India | KVIC Honey Traceability Infrastructure"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
