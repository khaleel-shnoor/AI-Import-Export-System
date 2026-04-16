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
    prompt = """
    Extract invoice data and return ONLY valid JSON.

    Format:
    {
      "product_name": "",
      "quantity": 0,
      "price": 0,
      "country": ""
    }
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
                "content": prompt + "\n\n" + raw_text
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

        # Clean markdown JSON
        clean_text = content.strip().replace("```json", "").replace("```", "")

        return json.loads(clean_text)

    except Exception as e:
        print("LLM ERROR:", str(e))
        return {"error": str(e)}