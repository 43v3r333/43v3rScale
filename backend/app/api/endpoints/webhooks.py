from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.core.db import get_session
from app.models.models import TaskResult, TaskStatus, Annotator
from app.services.consensus import consensus_service
import json

router = APIRouter()

@router.post("/label-studio")
async def label_studio_webhook(payload: dict, session: Session = Depends(get_session)):
    action = payload.get("action")
    if action in ["ANNOTATION_CREATED", "ANNOTATION_UPDATED"]:
        task_data = payload.get("task", {})
        annotation = payload.get("annotation", {})

        # In a real app, find task by external_id
        # For demo, assuming task_id=1
        task_id = 1

        await consensus_service.process_new_label(task_id, json.dumps(annotation.get("result")))

    return {"status": "success"}
