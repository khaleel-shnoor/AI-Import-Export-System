import asyncio
import os
import asyncpg
from dotenv import load_dotenv

# Path to the backend .env
dotenv_path = os.path.join("Backend", ".env")
load_dotenv(dotenv_path)

async def setup_db():
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("DATABASE_URL not found in Backend/.env")
        return

    # Extract connection info
    # Expected format: postgresql+asyncpg://user:password@host:port/dbname
    try:
        parts = db_url.split("://")[1]
        user_pass, host_port_db = parts.split("@")
        user, password = user_pass.split(":")
        host_port, dbname = host_port_db.split("/")
        host, port = host_port.split(":")
    except Exception as e:
        print(f"Error parsing DATABASE_URL: {e}")
        return

    print(f"Connecting to Postgres to check/create database '{dbname}'...")
    
    try:
        # Connect to default 'postgres' database
        conn = await asyncpg.connect(user=user, password=password, host=host, port=port, database="postgres")
        
        # Check if target database exists
        exists = await conn.fetchval(f"SELECT 1 FROM pg_database WHERE datname = '{dbname}'")
        
        if not exists:
            print(f"Database '{dbname}' does not exist. Creating...")
            # Cannot create database inside a transaction block
            await conn.execute(f"CREATE DATABASE \"{dbname}\"")
            print(f"Database '{dbname}' created successfully.")
        else:
            print(f"Database '{dbname}' already exists.")
            
        await conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(setup_db())
