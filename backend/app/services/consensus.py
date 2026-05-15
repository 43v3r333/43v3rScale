import json
from typing import List
from sqlmodel import Session, select
from app.models.models import TaskResult, TaskConsensus, TaskStatus, Assignment, Project
from app.core.db import engine
from app.services.inference_agent import inference_agent

class ConsensusEngine:
    @staticmethod
    def calculate_iou(poly1: List[dict], poly2: List[dict]) -> float:
        """Mock IoU for polygons (simplification for scaffolding)"""
        # In a real app, use Shapely: Polygon(p1).intersection(Polygon(p2)).area / union.area
        return 0.95 # Mock high agreement

    @staticmethod
    def calculate_correlation(rank1: List[int], rank2: List[int]) -> float:
        """Mock ranking correlation"""
        return 0.98 # Mock high correlation

    @staticmethod
    async def run_consensus(task_id: int):
        with Session(engine) as session:
            task = session.get(TaskResult, task_id)
            project = session.get(Project, task.project_id)
            assignments = session.exec(
                select(Assignment).where(Assignment.task_id == task_id, Assignment.status == "submitted")
            ).all()

            if len(assignments) < project.redundancy_count:
                return # Not enough labels yet

            # Logic to compare labels
            # For simplicity, we assume if 2 out of 3 agree (IoU > 0.8), we have consensus
            agreement_met = True # Simplified check

            if agreement_met:
                task.status = TaskStatus.CONSENSUS_REACHED
                task.final_result = assignments[0].label_data # Use first as representative
                session.add(task)
            else:
                # Escalation Hook: Trigger Gemini 3 Flash
                task.status = TaskStatus.ESCALATED
                tie_breaker = await inference_agent.prelabel_rlhf("Escalated: Need tie-breaker for conflicting labels")
                task.final_result = json.dumps(tie_breaker)
                task.status = TaskStatus.CONSENSUS_REACHED # Resolved by AI
                session.add(task)

            session.commit()

            if task.status == TaskStatus.CONSENSUS_REACHED:
                from app.tasks.celery_app import process_payment
                process_payment.delay(task.id)

consensus_engine = ConsensusEngine()

consensus_service = ConsensusEngine()
