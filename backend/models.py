from pydantic import BaseModel
from typing import Optional

class StartCallResponse(BaseModel):
    call_id: str

class TranscriptChunk(BaseModel):
    call_id: str
    text: str

class AnalysisResponse(BaseModel):
    pulse: str
    confidence: float
    suggestion: str

class EndCallRequest(BaseModel):
    call_id: str
    disposition: str
    notes: Optional[str] = None
    reschedule_date: Optional[str] = None
    reschedule_time: Optional[str] = None
