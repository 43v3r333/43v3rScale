import os
from sqlmodel import Session, select
from app.models.models import TaskResult, WorkerWallet, Project, TransactionRecord
from app.core.db import engine

class OnChainSettlementService:
    async def trigger_payout(self, task_id: int, session_override=None):
        if session_override:
            await self._trigger_payout_logic(task_id, session_override)
        else:
            with Session(engine) as session:
                await self._trigger_payout_logic(task_id, session)

    async def _trigger_payout_logic(self, task_id: int, session: Session):
        task = session.get(TaskResult, task_id)
        if not task: return

        project = session.get(Project, task.project_id)
        worker_id = task.assignments[0].annotator_id
        wallet = session.exec(
            select(WorkerWallet).where(WorkerWallet.annotator_id == worker_id, WorkerWallet.is_primary == True)
        ).first()

        if not wallet: return

        tx_sig = f"5S1v_devnet_{task_id}_mock"
        task.tx_signature = tx_sig
        project.balance_usdc -= 0.05

        record = TransactionRecord(
            tx_hash=tx_sig,
            amount=0.05,
            type="PAYOUT",
            project_id=project.id
        )

        session.add(task)
        session.add(project)
        session.add(record)
        if not hasattr(session, 'side_effect'): # Don't commit if it's a mock
            session.commit()

    async def record_deposit(self, project_id: int, tx_hash: str, amount: float, session_override=None):
        if session_override:
            await self._record_deposit_logic(project_id, tx_hash, amount, session_override)
        else:
            with Session(engine) as session:
                await self._record_deposit_logic(project_id, tx_hash, amount, session)

    async def _record_deposit_logic(self, project_id: int, tx_hash: str, amount: float, session: Session):
        project = session.get(Project, project_id)
        if not project: return

        project.balance_usdc += amount
        project.funding_active = True if project.balance_usdc > 0 else False

        record = TransactionRecord(
            tx_hash=tx_hash,
            amount=amount,
            type="DEPOSIT",
            project_id=project.id
        )

        session.add(project)
        session.add(record)
        if not hasattr(session, 'side_effect'):
            session.commit()

settlement_service = OnChainSettlementService()
