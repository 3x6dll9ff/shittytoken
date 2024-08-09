import re
from pathlib import Path
import shutil
from fastapi import UploadFile, HTTPException

# Путь к директории для сохранения файлов
SOURCE_DIRECTORY = Path("backend/src/")

AVATAR_DIRECTORY = SOURCE_DIRECTORY / "avatar"

# Проверка и создание директории
AVATAR_DIRECTORY.mkdir(parents=True, exist_ok=True)


def remove_existing_files(user_id: int):
    """Удаляет существующие файлы с именем file_{user_id} независимо от расширения."""

    # Поиск всех файлов в директории, соответствующих общему шаблону
    for file in AVATAR_DIRECTORY.glob(f"file-{user_id}.*"):
        file.unlink()  # Удаляем файл



def save_uploaded_file(file: UploadFile, user_id: int) -> str:
    allowed_extensions = {"jpg", "jpeg", "png", "gif"}
    file_extension = file.filename.split(".")[-1].lower()  # Привести к нижнему регистру

    if file_extension not in allowed_extensions:
        raise HTTPException(status_code=400, detail="Invalid file extension")

    # Удаляем существующие файлы с таким именем
    remove_existing_files(user_id)

    # Определяем имя и путь нового файла
    avatar_filename = f"file-{user_id}.{file_extension}"
    avatar_file_path = AVATAR_DIRECTORY / avatar_filename

    try:
        # Сохраняем файл на диск
        with avatar_file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    # Возвращаем путь к файлу
    return str(avatar_file_path)


def remove_file(file_path: str):
    file = Path(file_path)
    if file.exists():
        file.unlink()  # Удаляем файл
    else:
        raise HTTPException(status_code=404, detail="File not found")
