
import os
import sys
from sqlalchemy import create_engine, text

# Add backend to path to import settings if needed, or just use .env directly
try:
    with open('backend/.env', 'r') as f:
        for line in f:
            if line.startswith('DATABASE_URL='):
                db_url = line.split('=', 1)[1].strip()
                break
    print(f"Testing connection to: {db_url}")
    engine = create_engine(db_url)
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        print("Connection successful!")
        
        result = conn.execute(text("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'"))
        tables = [row[0] for row in result]
        print(f"Tables in database: {tables}")
except Exception as e:
    print(f"Error: {e}")
