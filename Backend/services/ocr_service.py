import pdfplumber
import pytesseract
from PIL import Image
import os
import json
import httpx


def extract_text_from_file(file_path: str, file_extension: str) -> str:
    text = ""

    # Smart Routing based on file type
    if file_extension == ".pdf":
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"

    elif file_extension in [".jpg", ".jpeg", ".png"]:
        # OCR for images
        img = Image.open(file_path).convert('L')
        text = pytesseract.image_to_string(img)

    return text.strip()


async def process_invoice_with_llm(raw_text: str) -> dict:
    prompt = """You are an invoice data extraction AI. 
Read the invoice text below and return ONLY a valid JSON object with these exact keys.
If a field is not found in the invoice, use null.

Required JSON format:
{
  "product_name": "<name of the main product or item on the invoice>",
  "quantity": <integer quantity, e.g. 2>,
  "price": <unit price as a float, e.g. 862.09>,
  "country": "<country of origin or seller's country>",
  "destination_country": "<ship-to country or buyer's country>",
  "invoice_number": "<invoice number or order ID>",
  "invoice_date": "<invoice date as written, e.g. Oct 25 2012>",
  "currency": "<currency code, e.g. USD>",
  "description": "<brief product description if available>",
  "total_value": <total invoice amount as float>
}

Return ONLY the JSON object. No explanation, no markdown fences.

Invoice Text:
"""

    # ✅ Load API key properly
    OPENROUTER_API_KEY = os.getenv("OPEN_ROUTER_API_KEY")

    if not OPENROUTER_API_KEY:
        return {"error": "Missing OPEN_ROUTER_API_KEY in environment variables"}

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "openai/gpt-4o-mini",
        "messages": [
            {
                "role": "user",
                "content": prompt + raw_text
            }
        ]
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers=headers,
                json=payload,
                timeout=60
            )

        result = response.json()

        print("FULL RESPONSE:", result)

        # ❌ Handle API error response
        if "choices" not in result:
            return {"error": result}

        content = result["choices"][0]["message"]["content"]

        # Clean markdown JSON fences if present
        clean_text = content.strip()
        if clean_text.startswith("```"):
            clean_text = clean_text.split("```")[-2] if clean_text.count("```") >= 2 else clean_text
            clean_text = clean_text.lstrip("json").strip()

        return json.loads(clean_text)

    except Exception as e:
        print("LLM ERROR:", str(e))
        return {"error": str(e)}