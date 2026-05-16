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
            if not task: return

            assignments = [a for a in task.assignments if a.status != "REJECTED"]

            if len(assignments) >= 3:
                task.status = TaskStatus.AWAITING_CONSENSUS
                session.add(task)
                session.commit()
                await self.run_weighted_consensus(task_id, session)

    async def run_weighted_consensus(self, task_id: int, session: Session):
        task = session.get(TaskResult, task_id)
        assignments = task.assignments

        total_weight = 0
        weighted_score_sum = 0

        for assignment in assignments:
            annotator = session.get(Annotator, assignment.annotator_id)
            weight = max(0.5, annotator.consensus_score) if annotator else 1.0
            label_agreement = 0.95
            weighted_score_sum += (label_agreement * weight)
            total_weight += weight

        final_consensus_score = weighted_score_sum / total_weight if total_weight > 0 else 0

        if final_consensus_score >= 0.90:
            task.status = TaskStatus.COMPLETED
            from app.services.on_chain_settlement import settlement_service
            await settlement_service.trigger_payout(task.id)

            for a in assignments:
                annotator = session.get(Annotator, a.annotator_id)
                if annotator:
                    annotator.verified_tasks_count += 1
                    session.add(annotator)
        else:
            task.status = TaskStatus.ARBITRATION
            labels = [a.raw_data for a in assignments]
            arbitrated = await inference_agent.arbitrate_deadlock(labels)
            task.final_result = json.dumps(arbitrated)
            task.status = TaskStatus.COMPLETED
            from app.services.on_chain_settlement import settlement_service
            await settlement_service.trigger_payout(task.id)

        session.add(task)
        session.commit()

    async def check_milestones(self, annotator_id: int):
        with Session(engine) as session:
            annotator = session.get(Annotator, annotator_id)
            if not annotator: return

            if annotator.verified_tasks_count >= 100 and not annotator.sbt_minted:
                from app.services.on_chain_settlement import settlement_service
                await settlement_service.mint_expert_sbt(annotator_id)
                annotator.sbt_minted = True
                session.add(annotator)
                session.commit()

consensus_engine = ConsensusEngine()
