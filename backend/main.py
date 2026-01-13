from fastapi import FastAPI
from uuid import uuid4
from datetime import datetime
import json

from store import CALL_SESSIONS, CALL_SUMMARIES, RESCHEDULED_CALLS
from models import *
from ai import analyze_call, summarize_call
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
)

logger = logging.getLogger(__name__)

app = FastAPI()


@app.post("/start-call", response_model=StartCallResponse)
def start_call():
    call_id = str(uuid4())
    CALL_SESSIONS[call_id] = {
        "started_at": datetime.utcnow(),
        "transcripts": [],
        "analysis_history": [],
        "status": "active"
    }

    logger.info(f"📞 Call started | call_id={call_id}")
    return {"call_id": call_id}


@app.post("/transcript")
def receive_transcript(chunk: TranscriptChunk):
    session = CALL_SESSIONS.get(chunk.call_id)
    if not session:
        logger.error(f"❌ Transcript received for invalid call_id={chunk.call_id}")
        return {"error": "Invalid call ID"}

    session["transcripts"].append(chunk.text)

    logger.info(
        f"📝 Transcript received | call_id={chunk.call_id} | chars={len(chunk.text)}"
    )
    return {"status": "received"}

@app.get("/analyze/{call_id}", response_model=AnalysisResponse)
def analyze(call_id: str):
    session = CALL_SESSIONS.get(call_id)
    if not session:
        logger.error(f"❌ Analyze requested for invalid call_id={call_id}")
        return {"error": "Invalid call ID"}

    transcript = " ".join(session["transcripts"])
    logger.info(
        f"🧠 Analyzing call | call_id={call_id} | transcript_len={len(transcript)}"
    )

    ai_output = analyze_call(transcript)
    parsed = json.loads(ai_output)

    session["analysis_history"].append(parsed)

    logger.info(
        f"📊 Pulse={parsed['pulse']} | confidence={parsed['confidence']}"
    )

    return parsed


@app.post("/end-call")
def end_call(data: EndCallRequest):
    session = CALL_SESSIONS.get(data.call_id)
    if not session:
        logger.error(f"❌ End call for invalid call_id={data.call_id}")
        return {"error": "Invalid call ID"}

    transcript = " ".join(session["transcripts"])
    logger.info(f"🔴 Ending call | call_id={data.call_id}")

    summary = summarize_call(transcript)
    CALL_SUMMARIES.append(summary)

    if data.disposition == "rescheduled":
        RESCHEDULED_CALLS.append({
            "call_id": data.call_id,
            "date": data.reschedule_date,
            "time": data.reschedule_time
        })
        logger.info(
            f"📅 Call rescheduled | call_id={data.call_id} | {data.reschedule_date} {data.reschedule_time}"
        )

    session["status"] = "ended"
    logger.info(f"✅ Call ended | call_id={data.call_id}")

    return {"summary": summary}


@app.get("/home")
def home_data():
    return {
        "ai_plan": [
            "Lead with value before pricing",
            "Ask about implementation timeline",
            "Avoid discount discussion early"
        ],
        "rescheduled_calls": RESCHEDULED_CALLS,
        "pitch_hint": "Ask 'how' questions before explaining features"
    }

@app.get("/")
def root():
    return {"status": "Backend running"}

@app.get("/reports")
def reports():
    return {
        "daily": CALL_SUMMARIES[-3:],
        "weekly": "Weekly improvement summary placeholder",
        "monthly": "Monthly improvement summary placeholder"
    }
