from sqlalchemy import Column, Integer, String, DateTime, Table, ForeignKey, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

Base = declarative_base()

# Промежуточная таблица many-to-many для User и Quest с состоянием квеста
user_quest = Table(
    'user_quest', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('quest_id', Integer, ForeignKey('quests.id'), primary_key=True),
    Column('completed', Boolean, default=False)  # Изменил значение по умолчанию на False
)

# Промежуточная таблица many-to-many для User и IpAddress
user_ip = Table(
    'user_ip', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('ip_address_id', Integer, ForeignKey('ip_addresses.id'), primary_key=True),
    Column('accessed_at', DateTime, server_default=func.now())  # Время доступа
)


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    web3_wallet = Column(String(100), unique=True, index=True, nullable=False)
    nonce = Column(String(16), default="")
    username = Column(String(50), index=True, unique=True, nullable=False)
    experience = Column(Integer, default=0)
    registered_at = Column(DateTime, server_default=func.now())
    avatar_file_path = Column(String, nullable=False, default='path-to-user-avatars/')

    # Связь с Quest через промежуточную таблицу
    quests = relationship("Quest", secondary=user_quest, back_populates="users")
    # Связь с IpAddress через промежуточную таблицу
    ip_addresses = relationship("IpAddress", secondary=user_ip, back_populates="users")


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

    # Связь с User через промежуточную таблицу
    users = relationship("User", secondary=user_quest, back_populates="quests")


class IpAddress(Base):
    __tablename__ = "ip_addresses"
    id = Column(Integer, primary_key=True, index=True)
    ip = Column(String, index=True)

    # Связь с User через промежуточную таблицу
    users = relationship("User", secondary=user_ip, back_populates="ip_addresses")


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
