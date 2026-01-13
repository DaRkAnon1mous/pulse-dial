from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def analyze_call(transcript: str):
    prompt = f"""
You are an AI sales coach.

Based on the conversation below, classify:
1. Emotional state (Comfortable, Neutral, Stressed)
2. Give ONE short silent coaching suggestion

Conversation:
{transcript}

Return JSON:
{{
  "pulse": "",
  "confidence": 0.0,
  "suggestion": ""
}}
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.4,
    )

    return response.choices[0].message.content


def summarize_call(transcript: str):
    prompt = f"""
Summarize this sales call for internal review.
Highlight:
- Outcome
- Objections
- Improvement areas

Conversation:
{transcript}
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
    )

    return response.choices[0].message.content
