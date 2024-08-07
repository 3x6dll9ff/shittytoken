from sqlalchemy import Column, Integer, String, DateTime, Table, ForeignKey, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

Base = declarative_base()

# Смежная таблица many-to-many для User и Quest с состоянием квеста
user_quest_association = Table(
    'user_quest_association', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('quest_id', Integer, ForeignKey('quests.id'), primary_key=True),
    Column('completed', Boolean, default=0)
)

# Таблица связи many-to-many для User и IpAddress
user_ip_address_association = Table(
    'user_ip_address_association', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('ip_address_id', Integer, ForeignKey('ip_addresses.id'), primary_key=True)
)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    web3_wallet = Column(String(100), unique=True, index=True, nullable=False)
    username = Column(String(50), index=True, unique=True, nullable=False)
    experience = Column(Integer, default=0)
    registered_at = Column(DateTime, server_default=func.now())
    avatar_file_path = Column(String, nullable=False)

    ip_addresses = relationship("IpAddress", secondary=user_ip_address_association, back_populates="users")
    quests = relationship("Quest", secondary=user_quest_association, back_populates="users")


class IpAddress(Base):
    __tablename__ = "ip_addresses"
    id = Column(Integer, primary_key=True, index=True)
    ip = Column(String, index=True)
    accessed_at = Column(DateTime, server_default=func.now())

    users = relationship("User", secondary=user_ip_address_association, back_populates="ip_addresses")


class Quest(Base):
    __tablename__ = "quests"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(70), nullable=False)
    description = Column(String, nullable=False)
    task_count = Column(Integer, default=0)
    reward_exp = Column(Integer, default=0)
    image_path = Column(String, nullable=False, unique=True)  # Храните путь к изображению в формате jpg

    chain_id = Column(Integer, ForeignKey('chains.id'))
    chain = relationship("Chain", back_populates="quests")

    project_id = Column(Integer, ForeignKey('projects.id'))
    project = relationship("Project", back_populates="quests")

    users = relationship("User", secondary=user_quest_association, back_populates="quests")


class Chain(Base):
    __tablename__ = "chains"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False, unique=True)
    image_path = Column(String, nullable=False, unique=True)  # Храните путь к изображению в формате jpg

    quests = relationship("Quest", back_populates="chain")


class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False, unique=True)
    image_path = Column(String, nullable=False, unique=True)  # Храните путь к изображению в формате jpg

    quests = relationship("Quest", back_populates="project")
