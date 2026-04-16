from pydantic_settings import BaseSettings
from pydantic import ConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Shnoor International LLC - Logistics"
    API_V1_STR: str = "/api/v1"
    
    DATABASE_URL: str = "postgresql://user:password@localhost/shipping_db"
    
    REDIS_URL: str = "redis://localhost:6379"
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    
    KAFKA_BOOTSTRAP_SERVERS: str = "localhost:9092"
    
    model_config = ConfigDict(
        env_file=".env",
        extra="ignore"
    )

settings = Settings()