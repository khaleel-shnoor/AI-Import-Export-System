import asyncio
import os
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine
from dotenv import load_dotenv

# Try finding .env in local or parent directory
dotenv_path = ".env" if os.path.exists(".env") else os.path.join("backend", ".env")
load_dotenv(dotenv_path)

async def check_columns():
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("DATABASE_URL not found")
        return

    try:
        engine = create_async_engine(db_url)
        async with engine.connect() as conn:
            result = await conn.execute(text("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'users'"))
            columns = result.fetchall()
            print("Columns in 'users' table:")
            for col in columns:
                print(f" - {col[0]} ({col[1]})")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(check_columns())
