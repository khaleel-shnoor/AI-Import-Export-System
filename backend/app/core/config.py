from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Import Export Intelligence"
    
    # DATABASE
    # Example format: postgresql://user:password@localhost/dbname
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/import_export_db"
    
    # AUTH
    SECRET_KEY: str = "super_secret_key_change_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"

settings = Settings()
