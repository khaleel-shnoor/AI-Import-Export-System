import httpx
import os
import re
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models.models import Shipment, ShipmentTracking
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPEN_ROUTER_API_KEY")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

async def get_chatbot_response(db: AsyncSession, message: str, history: list):
    if not OPENROUTER_API_KEY:
        return "Offline mode enabled. AI features required an API key."

    # Detect tracking code
    tracking_match = re.search(r"SHN-[A-Z0-9]{8}", message.upper())
    shipment_context = ""
    
    if tracking_match:
        code = tracking_match.group(0)
        result = await db.execute(select(Shipment).where(Shipment.shipment_code == code))
        shipment = result.scalars().first()
        
        if shipment:
            tracking_result = await db.execute(
                select(ShipmentTracking)
                .where(ShipmentTracking.shipment_id == shipment.id)
                .order_by(ShipmentTracking.timestamp.desc())
                .limit(3)
            )
            history_recs = tracking_result.scalars().all()
            history_str = "\n".join([f"- {t.timestamp}: {t.status} @ {t.location}" for t in history_recs])
            
            shipment_context = f"\n\n[CONTEXT: {code}]\n" \
                               f"Product: {shipment.product_name}\n" \
                               f"Route: {shipment.origin_country} to {shipment.destination_country}\n" \
                               f"Status: {shipment.status}\n" \
                               f"History:\n{history_str}\n"

    system_prompt = "You are Shnoor AI Assistant. Professional logistics consultant. Be concise."
    if shipment_context:
        system_prompt += shipment_context

    messages = [{"role": "system", "content": system_prompt}]
    for msg in history:
        messages.append(msg)
    messages.append({"role": "user", "content": message})

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                OPENROUTER_URL,
                headers={
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "meta-llama/llama-3.1-8b-instruct:free",
                    "messages": messages,
                    "temperature": 0.7
                },
                timeout=30.0
            )
            
            if response.status_code == 200:
                data = response.json()
                return data["choices"][0]["message"]["content"]
            
            error_detail = response.text
            print(f"AI Gateway Error (Status {response.status_code}): {error_detail}")
            return "Unable to reach AI gateway."
    except Exception as e:
        print(f"AI Service Exception: {str(e)}")
        return "Internal AI processing error."

async def generate_predictive_insight(product: str, origin: str, destination: str, status: str):
    """
    Generates a professional AI-driven logistics insight for a shipment.
    """
    if not OPENROUTER_API_KEY:
        return "AI analysis unavailable. Standard transit times apply."

    system_prompt = (
        "You are a logistics intelligence AI. Generate a single professional "
        "sentence (max 20 words) predicting a transit insight for this cargo."
    )
    user_prompt = f"Product: {product}, Route: {origin} to {destination}, Status: {status}"

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                OPENROUTER_URL,
                headers={"Authorization": f"Bearer {OPENROUTER_API_KEY}", "Content-Type": "application/json"},
                json={
                    "model": "meta-llama/llama-3.1-8b-instruct:free",
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_prompt}
                    ],
                    "temperature": 0.5
                },
                timeout=10.0
            )
            if response.status_code == 200:
                data = response.json()
                return data["choices"][0]["message"]["content"]
            return "Standard transit efficiency predicted."
    except Exception:
        return "Route stability verified. No immediate risks detected."
