import asyncio
import os
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine
from dotenv import load_dotenv

# Try finding .env in local or parent directory
dotenv_path = ".env" if os.path.exists(".env") else os.path.join("backend", ".env")
load_dotenv(dotenv_path)

async def check_tables():
    db_url = os.getenv("DATABASE_URL")
    print(f"Checking tables at: {db_url}")
    if not db_url:
        print("DATABASE_URL not found")
        return

    try:
        engine = create_async_engine(db_url)
        async with engine.connect() as conn:
            result = await conn.execute(text("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'"))
            tables = [row[0] for row in result.fetchall()]
            print(f"Tables found: {tables}")
            
            if 'users' in tables:
                print("✅ 'users' table exists.")
                # Check for rows
                res = await conn.execute(text("SELECT count(*) FROM users"))
                count = res.scalar()
                print(f"Number of users in DB: {count}")
            else:
                print("❌ 'users' table is MISSING!")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(check_tables())
