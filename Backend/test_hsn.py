import asyncio
import httpx

async def test():
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://127.0.0.1:8000/hsn/",
            json={"product_name": "Breville Refrigerator, Red", "shipment_id": 40, "persist_result": True}
        )
        print("Status:", response.status_code)
        print("Body:", response.text)

asyncio.run(test())
