from sqlalchemy import Column, String, Boolean, DateTime
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False) # 'beekeeper', 'gov_officer', 'buyer'
    role_title = Column(String, nullable=True)
    cluster = Column(String, nullable=True)
    location = Column(String, nullable=True)
    department = Column(String, nullable=True)
    company = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    reg_no = Column(String, nullable=True)
    badge_no = Column(String, nullable=True)
    license_no = Column(String, nullable=True)
    avatar = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
