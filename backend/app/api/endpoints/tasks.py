from fastapi import APIRouter, UploadFile, File, Depends
from sqlmodel import Session
from app.core.db import get_session
from app.services.router import router_service
from app.services.inference_agent import inference_agent
from app.models.models import TaskResult, TaskStatus
from fastapi.responses import StreamingResponse
import asyncio

router = APIRouter()

@router.post("/upload")
async def upload_task(file: UploadFile = File(...), session: Session = Depends(get_session)):
    content = await file.read()
    modal = router_service.identify_modal(file.filename)

    prelabel_data = {}
    if modal == "CVAT":
        prelabel_data = await inference_agent.prelabel_cv(content)
    else:
        text_content = content.decode('utf-8', errors='ignore')
        prelabel_data = await inference_agent.prelabel_rlhf(text_content)

    task = TaskResult(
        project_id=1,
        external_task_id=123,
        data=str(prelabel_data),
        status=TaskStatus.AI_DRAFTED
    )
    session.add(task)
    session.commit()
    session.refresh(task)

    return {
        "task_id": task.id,
        "modal": modal,
        "status": task.status,
        "prelabel": prelabel_data
    }

async def task_event_generator():
    while True:
        yield "data: {\"event\": \"update\"}\n\n"
        await asyncio.sleep(30)

@router.get("/stream")
async def stream_tasks():
    return StreamingResponse(task_event_generator(), media_type="text/event-stream")
