import json
from typing import List
from sqlmodel import Session, select
from app.models.models import TaskResult, TaskStatus, Assignment, Project, Annotator
from app.core.db import engine
from app.services.inference_agent import inference_agent

class ConsensusEngine:
    async def process_submission(self, task_id: int):
        with Session(engine) as session:
            task = session.get(TaskResult, task_id)
            assignments = [a for a in task.assignments if a.status != "REJECTED"]

            if len(assignments) >= 3:
                task.status = TaskStatus.AWAITING_CONSENSUS
                session.add(task)
                session.commit()
                await self.run_engine(task_id, session)

    async def run_engine(self, task_id: int, session: Session):
        task = session.get(TaskResult, task_id)
        # Compare labels (Placeholder for IoU/Similarity logic)
        agreement_score = 0.95

        if agreement_score >= 0.90:
            task.status = TaskStatus.COMPLETED
            # Trigger Settlement
            from app.services.on_chain_settlement import settlement_service
            await settlement_service.trigger_payout(task.id)
        else:
            # Tier-2 AI Arbitration
            task.status = TaskStatus.ARBITRATION
            labels = [a.raw_data for a in task.assignments]
            arbitrated = await inference_agent.arbitrate_deadlock(labels)
            task.final_result = json.dumps(arbitrated)
            task.status = TaskStatus.COMPLETED
            from app.services.on_chain_settlement import settlement_service
            await settlement_service.trigger_payout(task.id)

        session.add(task)
        session.commit()

consensus_engine = ConsensusEngine()

consensus_service = ConsensusEngine()
