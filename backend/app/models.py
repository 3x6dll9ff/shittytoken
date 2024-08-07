from sqlalchemy import Column, Integer, String, DateTime, Table, ForeignKey, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

Base = declarative_base()

# Таблица связи many-to-many для User и IpAddress
user_ip_address_association = Table(
    'user_ip_address', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('ip_address_id', Integer, ForeignKey('ip_addresses.id'), primary_key=True)
)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    web3_address = Column(String, unique=True, index=True)
    username = Column(String, index=True)
    experience = Column(Integer, default=0)
    registered_at = Column(DateTime(timezone=True), server_default=func.now())

    ip_addresses = relationship("IpAddress", secondary=user_ip_address_association, back_populates="users")
    avatars = relationship("Avatar", back_populates="user")

class IpAddress(Base):
    __tablename__ = "ip_addresses"
    id = Column(Integer, primary_key=True, index=True)
    ip = Column(String, index=True)
    accessed_at = Column(DateTime(timezone=True), server_default=func.now())

    users = relationship("User", secondary=user_ip_address_association, back_populates="ip_addresses")

class Avatar(Base):
    __tablename__ = "avatars"
    id = Column(Integer, primary_key=True, index=True)
    file_type = Column(Enum("png", "jpg", "gif", name="file_type_enum"), nullable=False)
    file_path = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'))

    user = relationship("User", back_populates="avatars")
