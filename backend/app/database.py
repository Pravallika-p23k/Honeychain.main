import logging
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import settings

logger = logging.getLogger("uvicorn")

db_url = settings.DATABASE_URL
engine = None

# Attempt to connect to PostgreSQL; fallback to SQLite if PostgreSQL is offline
if db_url.startswith("postgresql"):
    try:
        test_engine = create_engine(db_url, pool_pre_ping=True, connect_args={"connect_timeout": 3})
        with test_engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        engine = test_engine
        print("Connected successfully to PostgreSQL database!")
    except Exception as e:
        print(f"PostgreSQL not reachable at {db_url} ({e}). Falling back to local SQLite database (sqlite:///./honeychain.db).")
        db_url = "sqlite:///./honeychain.db"
        engine = create_engine(db_url, connect_args={"check_same_thread": False})
else:
    engine = create_engine(db_url, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
