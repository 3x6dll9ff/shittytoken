from fastapi import FastAPI
import uvicorn

from app.routers import router
from file_manager.routers import router as file_router

app = FastAPI()

app.include_router(router)
app.include_router(file_router, prefix="/files")


@app.get("/")
async def read_root():
    return {"message": "Hello World"}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)