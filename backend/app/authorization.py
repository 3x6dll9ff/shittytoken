import random
import string
import eth_account
from sqlalchemy.orm import Session
from app import crud

from datetime import datetime, timezone, timedelta

import jwt
from dotenv import load_dotenv
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer

import os

load_dotenv()

SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 10080  # 1 week

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def generate_nonce(db: Session, web3_address: str, client_ip):
    nonce = ''.join(random.choices(string.ascii_uppercase + string.digits, k=16))
    user = crud.get_user(db, web3_address)

    args = [db, web3_address, nonce, client_ip]
    if user:
        user = crud.update_nonce(*args)
    else:
        user = crud.create_user(*args)
    return user


def verify_signature(db: Session, web3_address: str, signature: str):
    user = crud.get_user(db, web3_address)
    if not user:
        raise ValueError("User not found")

    nonce = user.nonce
    message = f"Sign this message to authenticate: {nonce}"

    try:
        recovered_address = eth_account.Account.recover_message(message, signature=signature)
    except Exception as e:
        raise ValueError("Invalid signature")

    if recovered_address.lower() != web3_address.lower():
        raise ValueError("Signature does not match the address")

    return user
