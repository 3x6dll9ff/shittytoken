from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.models import User
from app.database import get_db
from file_manager.file_operations import save_uploaded_file

from .file_operations import SOURCE_DIRECTORY

router = APIRouter()


@router.post("/upload-avatar/")
def upload_avatar(user_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    avatar_file_path = save_uploaded_file(file, user_id)

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.avatar_file_path = avatar_file_path
    db.commit()

    return {"filename": avatar_file_path}


@router.get("/avatar/{user_id}")
def get_avatar(user_id: int, db: Session = Depends(get_db)):
    # Здесь нужно найти путь к файлу для данного пользователя
    user = db.query(User).filter(User.id == user_id).first()
    if not user or not user.avatar_file_path:
        raise HTTPException(status_code=404, detail="Avatar not found")

    file_path = SOURCE_DIRECTORY / user.avatar_file_path

    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")

    # Возвращаем файл как ответ
    return FileResponse(file_path)