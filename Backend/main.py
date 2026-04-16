from fastapi import FastAPI
from database import engine, Base
from routers import document

from dotenv import load_dotenv
import os

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPEN_ROUTER_API_KEY")

print("API KEY LOADED:", OPENROUTER_API_KEY is not None)

app = FastAPI(title="Shnoor Import-Export Intelligence API")

# Create tables on startup
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# Include Routers
app.include_router(document.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Import-Export API"}