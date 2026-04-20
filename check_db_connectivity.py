import asyncio
import os
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from dotenv import load_dotenv

# Path to the backend .env
dotenv_path = os.path.join("Backend", ".env")
load_dotenv(dotenv_path)

async def check_connection():
    db_url = os.getenv("DATABASE_URL")
    print(f"Checking connection to: {db_url}")
    if not db_url:
        print("DATABASE_URL not found in Backend/.env")
        return

    try:
        engine = create_async_engine(db_url)
        async with engine.connect() as conn:
            result = await conn.execute(text("SELECT 1"))
            print(f"Connection successful: {result.fetchone()}")
    except Exception as e:
        print(f"Connection failed: {e}")

if __name__ == "__main__":
    asyncio.run(check_connection())
