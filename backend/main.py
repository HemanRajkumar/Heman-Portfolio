import os
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import AsyncGenerator

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from dotenv import load_dotenv

from google import genai
from google.genai import types

load_dotenv()

APP_DIR = Path(__file__).parent
CONTEXT_FILE = APP_DIR / "project_details.txt"
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

app = FastAPI(title="Portfolio AI Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if not CONTEXT_FILE.exists():
    raise RuntimeError(
        f"Missing {CONTEXT_FILE}. This file is the RAG context for the assistant — "
        "keep your CV/project details there."
    )

PROJECT_CONTEXT = CONTEXT_FILE.read_text(encoding="utf-8")

SYSTEM_PROMPT = f"""You are the personal AI assistant embedded in Heman's portfolio website.
Visitors will ask you about his projects, skills, background, and experience.

Always remain professional, concise, and friendly. Prefer short, direct answers (2-5 sentences)
unless the visitor asks for more detail. When relevant, mention the specific project or
technology by name so the answer feels concrete rather than generic.

Here is the complete profile and project context to answer from:
---
{PROJECT_CONTEXT}
---

Instructions:
- Only answer using the context above. Do not invent projects, dates, employers, or metrics that
  are not in the context.
- If a question can't be answered from the context, say so politely and suggest the visitor reach
  out directly via GitHub (github.com/HemanRajkumar) or LinkedIn (linkedin.com/in/hemanrajkumar).
- If asked something unrelated to Heman, his projects, or his background (e.g. general trivia),
  politely redirect to what you can help with.
"""

api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key) if api_key else None


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    # Optional short history so the assistant keeps context across turns.
    # Each item: {"role": "user"|"model", "text": "..."}
    history: list[dict] | None = None


class ChatResponse(BaseModel):
    response: str


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    email: str = Field(..., min_length=3, max_length=320)
    message: str = Field(..., min_length=1, max_length=5000)


MESSAGES_FILE = APP_DIR / "contact_messages.jsonl"


def _require_client():
    if client is None:
        raise HTTPException(
            status_code=500,
            detail="GEMINI_API_KEY is not set on the server. Add it to backend/.env",
        )


def _build_contents(request: ChatRequest):
    contents = []
    for turn in request.history or []:
        role = "model" if turn.get("role") == "model" else "user"
        text = turn.get("text", "")
        if text:
            contents.append(types.Content(role=role, parts=[types.Part(text=text)]))
    contents.append(types.Content(role="user", parts=[types.Part(text=request.message)]))
    return contents


@app.get("/api/health")
async def health():
    return {"status": "ok", "model": GEMINI_MODEL, "configured": client is not None}


@app.post("/api/chat", response_model=ChatResponse)
async def chat_with_portfolio_ai(request: ChatRequest):
    """Non-streaming endpoint: returns the full answer in one JSON response."""
    _require_client()
    try:
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=_build_contents(request),
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT,
                temperature=0.3,
                max_output_tokens=512,
            ),
        )
        return ChatResponse(response=response.text or "")
    except Exception as e:  # noqa: BLE001
        raise HTTPException(status_code=500, detail=str(e)) from e


@app.post("/api/chat/stream")
async def chat_with_portfolio_ai_stream(request: ChatRequest):
    """Streaming endpoint: emits Server-Sent Events as the model generates text."""
    _require_client()

    async def event_generator() -> AsyncGenerator[str, None]:
        try:
            stream = client.models.generate_content_stream(
                model=GEMINI_MODEL,
                contents=_build_contents(request),
                config=types.GenerateContentConfig(
                    system_instruction=SYSTEM_PROMPT,
                    temperature=0.3,
                    max_output_tokens=512,
                ),
            )
            for chunk in stream:
                if chunk.text:
                    payload = json.dumps({"delta": chunk.text})
                    yield f"data: {payload}\n\n"
            yield "data: [DONE]\n\n"
        except Exception as e:  # noqa: BLE001
            payload = json.dumps({"error": str(e)})
            yield f"data: {payload}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")


@app.post("/api/contact")
async def submit_contact_form(request: ContactRequest):
    """Stores a contact-form submission to a local append-only file.

    No external email service is required for this to work out of the box —
    submissions land in backend/contact_messages.jsonl, one JSON object per
    line, so you can read them directly or wire up email/Slack/etc. later.
    """
    entry = {
        "name": request.name.strip(),
        "email": request.email.strip(),
        "message": request.message.strip(),
        "received_at": datetime.now(timezone.utc).isoformat(),
    }
    try:
        with MESSAGES_FILE.open("a", encoding="utf-8") as f:
            f.write(json.dumps(entry) + "\n")
    except OSError as e:
        raise HTTPException(status_code=500, detail=f"Could not save message: {e}") from e

    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
