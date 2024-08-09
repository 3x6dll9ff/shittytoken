from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas
from app.authorization import generate_nonce, verify_signature

router = APIRouter()


@router.get("/v1/generate-nonce/{address}", response_model=schemas.UserAuth)
def generate_nonce_route(address: str, request: Request, db: Session = Depends(get_db)):
    try:
        # Получаем IP-адрес клиента
        client_ip = request.client.host

        # Используем IP-адрес в функции
        user = generate_nonce(db, address, client_ip)
        return user
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/v1/verify-signature", response_model=schemas.UserBase)
def verify_signature_route(address: str, signature: str, db: Session = Depends(get_db)):
    try:
        user = verify_signature(db, address, signature)
        return user
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
