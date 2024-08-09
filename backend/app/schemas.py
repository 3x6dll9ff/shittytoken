from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    id: int
    web3_wallet: str
    username: str
    experience: int
    registered_at: Optional[datetime]
    avatar_file_path: str

class UserAuth(BaseModel):
    web3_wallet: str
    nonce: str

    class Config:
        from_attributes = True