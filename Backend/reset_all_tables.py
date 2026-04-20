import asyncio
import os
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine
from dotenv import load_dotenv

# Try finding .env in local or parent directory
dotenv_path = ".env" if os.path.exists(".env") else os.path.join("backend", ".env")
load_dotenv(dotenv_path)

async def reset_all():
    db_url = os.getenv("DATABASE_URL")
    print(f"Connecting to: {db_url}")
    if not db_url:
        print("DATABASE_URL not found")
        return

    try:
        engine = create_async_engine(db_url)
        async with engine.connect() as conn:
            print("🛑 Dropping ALL existing tables to fix schema mismatches...")
            
            # Get all table names in public schema
            result = await conn.execute(text("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'"))
            tables = [row[0] for row in result.fetchall()]
            
            for table in tables:
                print(f" - Dropping {table}...")
                await conn.execute(text(f"DROP TABLE IF EXISTS {table} CASCADE"))
            
            await conn.commit()
            print("\n✅ All tables dropped successfully.")
            print("🔄 Now restart your backend and run the import script again.")
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    asyncio.run(reset_all())
