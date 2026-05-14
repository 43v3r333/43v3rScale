from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.core.db import get_session
from app.models.models import Wallet
from typing import List

router = APIRouter()

@router.get("/", response_model=List[Wallet])
def read_wallets(session: Session = Depends(get_session)):
    wallets = session.exec(select(Wallet)).all()
    return wallets

@router.post("/", response_model=Wallet)
def create_wallet(wallet: Wallet, session: Session = Depends(get_session)):
    session.add(wallet)
    session.commit()
    session.refresh(wallet)
    return wallet
