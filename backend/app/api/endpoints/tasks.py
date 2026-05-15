from fastapi import APIRouter, UploadFile, File
from app.services.router import task_router
from app.services.inference_agent import inference_agent

router = APIRouter()

@router.post("/upload")
async def upload_task(file: UploadFile = File(...)):
    content = await file.read()
    destination = task_router.route_task(file.filename)

    prelabel_data = {}
    if destination == "CVAT":
        prelabel_data = await inference_agent.prelabel_cv(content)
    else:
        # Assuming RLHF is text/json
        text_content = content.decode('utf-8', errors='ignore')
        prelabel_data = await inference_agent.prelabel_rlhf(text_content)

    return {
        "filename": file.filename,
        "routed_to": destination,
        "prelabel": prelabel_data,
        "status": "AI_DRAFTED"
    }
