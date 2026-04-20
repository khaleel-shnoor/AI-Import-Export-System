import asyncio
import os
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine
from dotenv import load_dotenv

# Path to the backend .env
dotenv_path = os.path.join("backend", ".env")
load_dotenv(dotenv_path)

async def reset_users():
    db_url = os.getenv("DATABASE_URL")
    print(f"Connecting to: {db_url}")
    if not db_url:
        print("DATABASE_URL not found")
        return

    try:
        engine = create_async_engine(db_url)
        async with engine.connect() as conn:
            print("🛑 Dropping 'users' table because of schema mismatch...")
            await conn.execute(text("DROP TABLE IF EXISTS users CASCADE"))
            await conn.commit()
            print("✅ 'users' table dropped successfully.")
            
            print("\n🔄 Now restarting backend will recreate it with correct columns.")
            print("Alternatively, you can run 'Base.metadata.create_all' now.")
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    asyncio.run(reset_users())
