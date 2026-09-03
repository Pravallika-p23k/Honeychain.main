from pydantic import BaseModel
from typing import Optional

class UserLoginSchema(BaseModel):
    email: str
    password: str
    role: Optional[str] = "beekeeper"

class UserRegisterSchema(BaseModel):
    name: str
    email: str
    password: str
    role: str
    role_title: Optional[str] = None
    cluster: Optional[str] = None
    phone: Optional[str] = None

class UserResponseSchema(BaseModel):
    id: str
    name: str
    email: str
    role: str
    role_title: Optional[str] = None
    cluster: Optional[str] = None
    location: Optional[str] = None
    department: Optional[str] = None
    company: Optional[str] = None
    phone: Optional[str] = None
    reg_no: Optional[str] = None
    badge_no: Optional[str] = None
    license_no: Optional[str] = None
    avatar: Optional[str] = None

    class Config:
        from_attributes = True

class TokenResponseSchema(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponseSchema
