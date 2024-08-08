import random
import string
from datetime import datetime, timezone

from sqlalchemy import func
from sqlalchemy.orm import Session
from . import models


def get_user(db: Session, web3_wallet: str):
    return db.query(models.User).filter(models.User.web3_wallet == web3_wallet).first()


def create_user(db: Session, web3_wallet: str, nonce: str, ip_address: str, username: str = None):

    if not username:
        username = web3_wallet

    db_user = models.User(
        web3_wallet=web3_wallet,
        nonce=nonce,
        username=username
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    add_ip_to_user(db, db_user.id, ip_address)

    return db_user


def update_nonce(db: Session, address: str, nonce: str, client_ip: str):
    db_user = get_user(db, address)
    if db_user:
        db_user.nonce = nonce

        add_ip_to_user(db, db_user.id, client_ip)

        db.commit()
        db.refresh(db_user)
    return db_user


def add_ip_to_user(db: Session, user_id: int, client_ip: str):
    # Получаем объект адреса
    ip_address_object = db.query(models.IpAddress).filter(models.IpAddress.ip == client_ip).first()

    if not ip_address_object:
        ip_address_object = models.IpAddress(ip=client_ip)
        db.add(ip_address_object)
        db.commit()
        db.refresh(ip_address_object)

    # Получаем пользователя
    user = db.query(models.User).get(user_id)
    if not user:
        raise ValueError("User not found")

    # Проверяем, существует ли уже ассоциация
    association = db.query(models.user_ip).filter(
        models.user_ip.c.user_id == user_id,
        models.user_ip.c.ip_address_id == ip_address_object.id
    ).first()

    if association:
        # Обновляем время последнего доступа
        db.execute(
            models.user_ip.update().where(
                models.user_ip.c.user_id == user_id,
                models.user_ip.c.ip_address_id == ip_address_object.id
            ).values(accessed_at=func.now())
        )
        db.commit()
        print("IP address updated with new access time.")
    else:
        # Создаем новую запись в связной таблице
        db.execute(
            models.user_ip.insert().values(
                user_id=user_id,
                ip_address_id=ip_address_object.id,
                accessed_at=func.now()
            )
        )
        db.commit()
        print("IP address added to user.")