import os
from sqlmodel import Session
from app.models.models import TaskResult, WorkerWallet
from app.core.db import engine

class OnChainSettlementService:
    async def trigger_payout(self, task_id: int):
        with Session(engine) as session:
            task = session.get(TaskResult, task_id)
            if not task: return

            # Simulated Solana Payout logic
            print(f"Settling task {task_id} on-chain...")

            # Simulated tx signature
            tx_sig = "5S1v...mock_hash"
            task.tx_signature = tx_sig

            session.add(task)
            session.commit()

settlement_service = OnChainSettlementService()
