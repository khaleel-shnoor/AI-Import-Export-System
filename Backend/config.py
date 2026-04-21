import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    HSN_SERVICE_URL = os.getenv("HSN_SERVICE_URL", "http://127.0.0.1:8003")
    DUTY_SERVICE_URL = os.getenv("DUTY_SERVICE_URL", "http://127.0.0.1:8004")
    RISK_SERVICE_URL = os.getenv("RISK_SERVICE_URL", "http://127.0.0.1:8005")

config = Config()
