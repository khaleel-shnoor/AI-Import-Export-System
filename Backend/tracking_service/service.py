import asyncio
import json
import os
from fastapi import WebSocket, WebSocketDisconnect
from sqlalchemy import text
from sqlalchemy.future import select
from models.models import Shipment, ShipmentTracking
from database import engine, AsyncSession
from ai_service.service import generate_predictive_insight

async def get_shipment_tracking(db: AsyncSession, code: str):
    # Find Shipment
    shp_stmt = select(Shipment).where(Shipment.shipment_code == code.upper())
    shp_res = await db.execute(shp_stmt)
    shipment = shp_res.scalars().first()
    
    if not shipment:
        return {"error": "Shipment not found"}

    # Get Tracking History
    track_stmt = select(ShipmentTracking).where(ShipmentTracking.shipment_id == shipment.id).order_by(ShipmentTracking.timestamp.desc())
    track_res = await db.execute(track_stmt)
    history = track_res.scalars().all()

    # Get AI Prediction
    ai_insight = await generate_predictive_insight(
        shipment.product_name, 
        shipment.origin_country, 
        shipment.destination_country, 
        shipment.status
    )

    return {
        "shipment": shipment,
        "history": history,
        "ai_insight": ai_insight
    }

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except Exception:
                pass

manager = ConnectionManager()

async def listen_to_pg_tracking():
    """
    Background task to listen for Postgres NOTIFY events and broadcast them to WebSockets.
    """
    conn = await engine.connect()
    try:
        # Note: In a real production environment with asyncpg, 
        # you'd use conn.add_listener for LISTEN/NOTIFY.
        # This is a simplified version for the demo gateway.
        while True:
            # We simulate the listener here for the integrated portal
            await asyncio.sleep(10) 
            # In a full Postgres setup, you would await a notification queue
    except Exception as e:
        print(f"Tracking Listener Error: {e}")
    finally:
        await conn.close()
