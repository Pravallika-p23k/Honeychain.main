import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Honey Chain Backend API"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/honeychain"
    SECRET_KEY: str = "honeychain_secret_key_super_secure_2026_kvic_portal"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    
    ALLOWED_ORIGINS: str = "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
