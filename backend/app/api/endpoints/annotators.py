from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.core.db import get_session
from app.models.models import Annotator
from typing import List

router = APIRouter()

@router.get("/", response_model=List[Annotator])
def read_annotators(session: Session = Depends(get_session)):
    annotators = session.exec(select(Annotator)).all()
    return annotators

@router.post("/", response_model=Annotator)
def create_annotator(annotator: Annotator, session: Session = Depends(get_session)):
    session.add(annotator)
    session.commit()
    session.refresh(annotator)
    return annotator
