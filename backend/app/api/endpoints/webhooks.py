from fastapi import APIRouter, Depends, Request
from sqlmodel import Session
from app.core.db import get_session
from app.services.pipeline import data_pipeline

router = APIRouter()

@router.post("/label-studio")
async def label_studio_webhook(request: Request, session: Session = Depends(get_session)):
    payload = await request.json()
    await data_pipeline.process_label_studio(payload, session)
    return {"status": "received"}

@router.post("/cvat")
async def cvat_webhook(request: Request, session: Session = Depends(get_session)):
    payload = await request.json()
    await data_pipeline.process_cvat(payload, session)
    return {"status": "received"}
