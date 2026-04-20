import asyncio
import os
import sys

# Add the current directory to sys.path so we can import database and models
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import engine, AsyncSession
from sqlalchemy.future import select
from models.models import User
from auth.utils import get_password_hash

async def check_and_seed_user():
    print("Checking for existing users...")
    async with AsyncSession(engine) as session:
        result = await session.execute(select(User))
        users = result.scalars().all()
        
        if not users:
            print("No users found. Seeding a default admin user...")
            admin_user = User(
                name="Admin User",
                email="admin@shnoor.com",
                password_hash=get_password_hash("admin123"),
                role="admin",
                is_active=True
            )
            session.add(admin_user)
            await session.commit()
            print("✅ Default user created: admin@shnoor.com / admin123")
        else:
            print(f"Found {len(users)} users:")
            for user in users:
                print(f" - {user.email} (Role: {user.role}, Active: {user.is_active})")

if __name__ == "__main__":
    asyncio.run(check_and_seed_user())
