from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from database import get_db
from . import service

router = APIRouter(prefix="/ai", tags=["AI & Chatbot"])

class ChatRequest(BaseModel):
    message: str
    history: list = []

@router.post("/chatbot")
async def chatbot(request: ChatRequest, db: AsyncSession = Depends(get_db)):
    content = await service.get_chatbot_response(db, request.message, request.history)
    return {"response": content}
