from fastapi import APIRouter, Depends, Request, Header, HTTPException
from sqlmodel import Session
from app.core.db import get_session
from app.models.models import TaskResult
import json

router = APIRouter()

@router.post("/label-studio")
async def label_studio_webhook(request: Request, session: Session = Depends(get_session)):
    payload = await request.json()

    # Label Studio webhook payload structure
    # action: str, annotation: dict, task: dict, etc.
    action = payload.get("action")
    if action in ["ANNOTATION_CREATED", "ANNOTATION_UPDATED"]:
        annotation = payload.get("annotation", {})
        task = payload.get("task", {})

        task_result = TaskResult(
            project_id=1, # Default or extracted from mapping
            external_task_id=task.get("id"),
            data=json.dumps(annotation.get("result", [])),
            # In a real scenario, we'd map LS user to our Annotator
        )
        session.add(task_result)
        session.commit()

    return {"status": "success"}
