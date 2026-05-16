from sqlmodel import Session, select
from app.models.models import TaskResult, Assignment, Annotator
from app.core.db import engine
import json

class QualificationService:
    @staticmethod
    async def evaluate_worker_on_gold(assignment_id: int):
        with Session(engine) as session:
            assignment = session.get(Assignment, assignment_id)
            if not assignment: return

            task = session.get(TaskResult, assignment.task_id)
            if not task or not task.is_gold_standard: return

            # Compare assignment.raw_data with task.ground_truth_data
            # Placeholder for comparison logic (e.g. IoU or similarity)
            score = 0.95 # Mock high score

            assignment.consensus_score = score
            assignment.status = "VERIFIED" if score > 0.9 else "REJECTED"

            # Update Annotator Reputation
            annotator = session.get(Annotator, assignment.annotator_id)
            if annotator:
                annotator.tasks_completed += 1
                annotator.consensus_score = (
                    (annotator.consensus_score * (annotator.tasks_completed - 1)) + score
                ) / annotator.tasks_completed

                # Auto-qualify if average reputation > 0.9 after 5 gold tasks
                if annotator.tasks_completed >= 5 and annotator.consensus_score >= 0.9:
                    annotator.is_qualified = True

            session.add(assignment)
            session.add(annotator)
            session.commit()

qualification_service = QualificationService()
