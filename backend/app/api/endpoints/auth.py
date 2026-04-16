from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.all_models import User
from app.models.schemas import UserResponse, UserCreate, Token

router = APIRouter()

@router.post("/register", response_model=UserResponse)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    # Mock registration (no real hashing for brevity, implement passlib in prod)
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(email=user_in.email, hashed_password=user_in.password + "hashed")
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    # Mock token generation
    return {"access_token": "mock_jwt_token_for_" + user.email, "token_type": "bearer"}
