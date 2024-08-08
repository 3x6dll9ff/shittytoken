import random
import string
import eth_account
from sqlalchemy.orm import Session
from app import crud


def generate_nonce(db: Session, address: str, client_ip):
    nonce = ''.join(random.choices(string.ascii_uppercase + string.digits, k=16))
    user = crud.get_user(db, address)

    args = [db, address, nonce, client_ip]
    if user:
        user = crud.update_nonce(*args)
    else:
        user = crud.create_user(*args)
    return user


def verify_signature(db: Session, address: str, signature: str):
    user = crud.get_user(db, address)
    if not user:
        raise ValueError("User not found")

    nonce = user.nonce
    message = f"Sign this message to authenticate: {nonce}"

    try:
        recovered_address = eth_account.Account.recover_message(message, signature=signature)
    except Exception as e:
        raise ValueError("Invalid signature")

    if recovered_address.lower() != address.lower():
        raise ValueError("Signature does not match the address")

    return user
