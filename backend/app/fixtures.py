from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.sql import func

from app.models import Base, User, IpAddress, Quest, Chain, Project  # Замените на актуальные пути

# Замените URL подключения на ваш URL подключения к базе данных
DATABASE_URL = "sqlite:///../test.db"

def create_fixtures():
    # Создаем подключение к базе данных
    engine = create_engine(DATABASE_URL, echo=True)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    session = SessionLocal()

    try:
        # Создаем все таблицы, если они еще не существуют
        Base.metadata.create_all(engine)

        # Добавляем данные в таблицу Chain
        chains = [
            Chain(name="Chain 1", image_path="path/to/chain1.jpg"),
            Chain(name="Chain 2", image_path="path/to/chain2.jpg"),
            Chain(name="Chain 3", image_path="path/to/chain3.jpg")
        ]
        session.bulk_save_objects(chains)
        session.commit()

        # Добавляем данные в таблицу Project
        projects = [
            Project(name="Project 1", image_path="path/to/project1.jpg"),
            Project(name="Project 2", image_path="path/to/project2.jpg"),
            Project(name="Project 3", image_path="path/to/project3.jpg")
        ]
        session.bulk_save_objects(projects)
        session.commit()

        # Добавляем данные в таблицу IpAddress
        ip_addresses = [
            IpAddress(ip="192.168.1.1"),
            IpAddress(ip="192.168.1.2"),
            IpAddress(ip="192.168.1.3")
        ]
        session.bulk_save_objects(ip_addresses)
        session.commit()

        # Добавляем данные в таблицу User
        users = [
            User(web3_wallet="0x12345", username="user1", experience=100, avatar_file_path="path/to/avatar1.jpg"),
            User(web3_wallet="0x67890", username="user2", experience=200, avatar_file_path="path/to/avatar2.jpg"),
            User(web3_wallet="0xabcde", username="user3", experience=300, avatar_file_path="path/to/avatar3.jpg")
        ]
        session.bulk_save_objects(users)
        session.commit()

        # Добавляем данные в таблицу Quest
        quests = [
            Quest(title="Quest 1", description="Description for quest 1", task_count=5, reward_exp=50, image_path="path/to/quest1.jpg", chain_id=1, project_id=1),
            Quest(title="Quest 2", description="Description for quest 2", task_count=10, reward_exp=100, image_path="path/to/quest2.jpg", chain_id=2, project_id=2),
            Quest(title="Quest 3", description="Description for quest 3", task_count=15, reward_exp=150, image_path="path/to/quest3.jpg", chain_id=3, project_id=3)
        ]
        session.bulk_save_objects(quests)
        session.commit()

    except SQLAlchemyError as e:
        session.rollback()
        print(f"An error occurred: {e}")

    finally:
        session.close()

if __name__ == "__main__":
    create_fixtures()
