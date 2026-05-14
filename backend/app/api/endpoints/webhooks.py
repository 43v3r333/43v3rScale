from fastapi import APIRouter, Depends, Request
from sqlmodel import Session, select
from app.core.db import get_session
from app.models.models import TaskResult, Annotator
from app.tasks.celery_app import process_approved_task, check_milestone
import json

router = APIRouter()

@router.post("/label-studio")
async def label_studio_webhook(payload: dict, session: Session = Depends(get_session)):
    action = payload.get("action")
    if action in ["ANNOTATION_CREATED", "ANNOTATION_UPDATED"]:
        annotation = payload.get("annotation", {})
        task = payload.get("task", {})

        # Determine status and accuracy
        status = "approved" if annotation.get("was_cancelled") is False else "pending"
        accuracy = 1.0 # Mock accuracy

        task_result = TaskResult(
            project_id=1,
            external_task_id=task.get("id"),
            data=json.dumps(annotation.get("result", [])),
            status=status,
            accuracy=accuracy
        )
        session.add(task_result)
        session.commit()
        session.refresh(task_result)

        if status == "approved":
            process_approved_task.delay(task_result.id)

            # Update annotator milestones (Mocked annotator_id=1)
            annotator = session.get(Annotator, 1)
            if annotator and accuracy >= 0.9:
                annotator.high_accuracy_count += 1
                if annotator.high_accuracy_count >= 100 and not annotator.sbt_minted:
                    check_milestone.delay(annotator.id)
                session.add(annotator)
                session.commit()

    return {"status": "success"}
