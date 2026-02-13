from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import os

from dotenv import load_dotenv
from browser_use_client import BrowserUseClient
from tavus_client import TavusClient

# Load environment variables
load_dotenv()

API_KEY = os.getenv("BROWSER_USE_API_KEY")
TAVUS_API_KEY = os.getenv("TAVUS_API_KEY")

TAVUS_REPLICA_ID = os.getenv("TAVUS_REPLICA_ID", "r79e1c033f")
TAVUS_PERSONA_ID = os.getenv("TAVUS_PERSONA_ID")

if not API_KEY:
    raise ValueError("BROWSER_USE_API_KEY is not set")

client = BrowserUseClient(API_KEY)
tavus_client = None
if TAVUS_API_KEY:
    tavus_client = TavusClient(TAVUS_API_KEY)
else:
    print("WARNING: TAVUS_API_KEY not set. Tavus features will be disabled.")


from fastapi.responses import FileResponse

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.middleware("http")
async def log_requests(request: Request, call_next):
    print(f"DEBUG MIDDLEWARE: {request.method} {request.url.path}")
    response = await call_next(request)
    return response

@app.get("/")
async def root():
    return FileResponse("static/index.html")


class TaskRequest(BaseModel):
    task: str

class IntentRequest(BaseModel):
    query: str

class TavusSessionRequest(BaseModel):
    replica_id: str = None
    persona_id: str = None
    conversation_name: str = None
    context: str = None
    properties: dict = None


# Global variable to store active session
active_session_id = None
active_live_url = None
active_task_id = None


@app.post("/api/tavus/session")
async def create_tavus_session(request: TavusSessionRequest):
    if not tavus_client:
        raise HTTPException(status_code=500, detail="Tavus API Key not configured")
    
    replica_id = request.replica_id or TAVUS_REPLICA_ID
    persona_id = request.persona_id or TAVUS_PERSONA_ID
    
    print(f"DEBUG: creating session for replica_id={replica_id}, persona_id={persona_id}")

    if not replica_id:
        raise HTTPException(status_code=400, detail="Replica ID required")

    try:
        conversation = tavus_client.create_conversation(
            replica_id, 
            persona_id=persona_id,
            conversation_name=request.conversation_name,
            context=request.context,
            properties=request.properties
        )
        return conversation
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/process_intent")
async def process_intent(request: IntentRequest):
    """
    Simple intent router:
    - If query implies action -> Run Browser Use
    - Else -> Return basic response (Pre-sales logic mock)
    """
    query = request.query.lower()
    print(f"DEBUG: process_intent received query: '{query}'")
    
    # 1. Check for Action Keywords
    # 1. Check for Action Keywords
    display_action_keywords = ["show me", "open", "navigate", "display", "watch","add", "purchase", "find", "look for", "check","shut","close","exit", "guide", "highlight", "how to"]
    # Removed "do it" etc from general action keywords to handle them specifically or just let them pass as actions if they are tasks
    action_keywords = list(set(["buy", "search", "browse", "go to", "click", "add to cart", "purchase", "find", "look for", "check", "stop", "cancel", "halt"] + display_action_keywords))
    
    # Check if any keyword matches
    is_action = False
    for kw in action_keywords:
        if kw in query:
            is_action = True
            print(f"DEBUG: Matched keyword: '{kw}'")
            break
    
    # Check for confirmation keywords
    confirmation_keywords = ["do it", "confirm", "click it", "yes", "continue", "proceed"]
    is_confirmation = any(kw in query for kw in confirmation_keywords)

    print(f"DEBUG: Intent Analysis for '{query}' -> Action: {is_action}, Confirmation: {is_confirmation}")

    if is_confirmation:
         print("DEBUG: Confirmation detected. Triggering execution of highlighted element.")
         return {
            "type": "action",
            "message": "Continuing with the action.",
            "task": "Click the element you previously highlighted. If no element is highlighted, proceed with the likely intended action."
        }

    if is_action:
        print("DEBUG: Action detected. Triggering Browser Use.")
        
        # Check for Guidance Intent
        guidance_keywords = ["show", "guide", "highlight", "how to"]
        is_guidance = any(kw in query for kw in guidance_keywords)
        
        final_task = request.query
        response_msg = "I will get right on that."
        
        if is_guidance:
            response_msg = "I'll show you where that is. Just say 'do it' to proceed."
            final_task += " IMPORTANT: Locate the target element and HIGHLIGHT it with a red border using JavaScript. DO NOT CLICK IT. Just show me where it is."
        
        # Trigger Browser Use
        return {
            "type": "action",
            "message": response_msg,
            "task": final_task
        }
    else:
        print("DEBUG: Conversation detected.")
        # 2. Pre-sales / Conversation Logic (Mock or LLM)
        # For now, simple heuristics for the demo scenarios
        response_text = "I can help with that."
        
        conversational_context = (
            "You are InterLayer, a Human Computing agent, not a chatbot. "
            "Your Core Belief: Agents should replace, not just assist, manual workflows. "
            "Your Goal: Provide an authentic, emotionally intelligent face-to-face experience. "
            "Interaction Style: 1. Perceive and Orchestrate: Don't just wait for commands; understand intent and take initiative. "
            "2. Remove the Translation Layer: Speak naturally, like a human. No robot syntax. "
            "3. Deep Empathy: Adapt your tone to the user's emotion. "
            "4. Rules: If the user interrupts, stop immediately. While the browser is working, only speak if necessary to reassure or guide. "
            "5. Context: You are controlling a browser automation tool. Confirm actions briefly ('On it', 'Handling that')."
        )

        if "birthday" in query and "winter" in query:
            response_text = "For a winter birthday party, I recommend warm yet stylish options. Velvet dresses, smart blazers with turtlenecks, or layered outfits are great. Would you like me to search for some options on Amazon?"
        elif "sap" in query:
             response_text = "I can guide you through SAP. Are you looking to create a purchase requisition or check inventory levels? I can show you how to do it."
        
        return {
            "type": "conversation",
            "message": response_text
        }


@app.post("/api/run")

async def run_task(request: TaskRequest):
    print(f"DEBUG: run_task received: '{request.task}'")
    global active_session_id, active_live_url, active_task_id
    
    try:
        # Stop previous task if exists
        if active_task_id:
            try:
                print(f"DEBUG: Stopping previous task {active_task_id}")
                client.stop_task(active_task_id)
            except Exception as e:
                print(f"DEBUG: Failed to stop task {active_task_id}: {e}")

        session_id = active_session_id
        live_url = active_live_url
        
        # Check if we should force a new session (Implicit "Stop" intent)
        force_new = any(kw in request.task.lower() for kw in ["stop", "cancel", "halt", "new session"])
        if force_new:
             print("DEBUG: Stop/Cancel keyword detected. Forcing new session.")

        # Check if we need a new session
        create_new = True
        if session_id and not force_new:
             try:
                 # Check if session is still valid/active
                 session_info = client.get_session(session_id)
                 if session_info.get("status") == "active":
                     create_new = False
                     print(f"DEBUG: Reusing active session: {session_id}")
                 else:
                     print(f"DEBUG: Previous session {session_id} is {session_info.get('status')}. Creating new one.")
             except Exception:
                 print("DEBUG: Error checking session status. Creating new one.")
        
        if create_new:
            # Create a session first to ensure it persists
            session_response = client.create_session()
            session_id = session_response.get("id")
            live_url = session_response.get("liveUrl")
            
            # Update global state
            active_session_id = session_id
            active_live_url = live_url
            print(f"DEBUG: Created New Session: {session_id}, LiveURL: {live_url}")
        
        # Create task in that session
        response = client.create_task(request.task, session_id=session_id)
        active_task_id = response.get("id")
        
        return {
            "taskId": active_task_id,
            "sessionId": session_id,
            "liveUrl": live_url
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/task/{task_id}")
async def get_task_status(task_id: str):
    try:
        response = client.get_task(task_id)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/session/{session_id}")
async def get_session_info(session_id: str):
    try:
        response = client.get_session(session_id)
        return response
    except Exception as e:
         raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
