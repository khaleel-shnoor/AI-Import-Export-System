from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import traceback
from dotenv import load_dotenv

from database import engine, Base
from routers import document, shipment, tracking
from auth.routes import router as auth_router
from hsn_service.routes import router as hsn_router
from duty_service.routes import router as duty_router
from risk_service.routes import router as risk_router
import asyncio
from services.websocket_service import listen_to_pg_tracking

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPEN_ROUTER_API_KEY")
print("API KEY LOADED:", OPENROUTER_API_KEY is not None)

app = FastAPI(title="AI Import-Export Intelligence System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(document.router)
app.include_router(auth_router)
app.include_router(shipment.router)
app.include_router(tracking.router)
app.include_router(hsn_router)
app.include_router(duty_router)
app.include_router(risk_router)

@app.get("/")
async def root():
    return {"message": "AI Import-Export System Backend is Running ✅"}

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    asyncio.create_task(listen_to_pg_tracking())

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    print("=== INTERNAL SERVER ERROR ===")
    print(traceback.format_exc())
    return JSONResponse(status_code=500, content={"detail": "Internal Server Error"})
