from fastapi import APIRouter, Depends, Request
from sqlmodel import Session
from app.core.db import get_session
from app.services.consensus import consensus_service
from app.models.models import Assignment, TaskResult, TaskStatus
import json
from datetime import datetime

router = APIRouter()

@router.post("/engine-callback")
async def engine_callback(payload: dict, session: Session = Depends(get_session)):
    """
    Accepts annotation JSON from Label Studio or CVAT
    """
    task_id = payload.get("task_id")
    annotator_id = payload.get("annotator_id")
    label_data = payload.get("label_data")

    if not all([task_id, annotator_id, label_data]):
        return {"error": "Missing fields"}

    # Save Annotation as Assignment
    assignment = Assignment(
        task_id=task_id,
        annotator_id=annotator_id,
        label_data=json.dumps(label_data),
        submitted_at=datetime.utcnow(),
        status="submitted"
    )
    session.add(assignment)
    session.commit()

    # Trigger consensus check if 3 submissions exist
    await consensus_service.run_consensus_check(task_id)

    return {"status": "success"}

@router.post("/label-studio")
async def label_studio_webhook(payload: dict, session: Session = Depends(get_session)):
    # Legacy wrapper for existing pipeline if needed
    return {"status": "success"}

@router.post("/cvat")
async def cvat_webhook(payload: dict, session: Session = Depends(get_session)):
    return {"status": "success"}
