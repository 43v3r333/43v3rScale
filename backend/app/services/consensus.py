import json
from difflib import SequenceMatcher
from typing import List
from sqlmodel import Session, select
from app.models.models import TaskResult, TaskStatus, Assignment, Project, Annotator
from app.core.db import engine

class ConsensusService:
    @staticmethod
    def calculate_iou(box1: dict, box2: dict) -> float:
        """Calculate IoU for bounding boxes: {'x', 'y', 'w', 'h'}"""
        x_left = max(box1['x'], box2['x'])
        y_top = max(box1['y'], box2['y'])
        x_right = min(box1['x'] + box1['w'], box2['x'] + box2['w'])
        y_bottom = min(box1['y'] + box1['h'], box2['y'] + box2['h'])

        if x_right < x_left or y_bottom < y_top:
            return 0.0

        intersection_area = (x_right - x_left) * (y_bottom - y_top)
        area1 = box1['w'] * box1['h']
        area2 = box2['w'] * box2['h']
        union_area = area1 + area2 - intersection_area

        return intersection_area / union_area if union_area > 0 else 0

    @staticmethod
    def calculate_semantic_similarity(str1: str, str2: str) -> float:
        """Calculate similarity for RLHF tasks using SequenceMatcher"""
        return SequenceMatcher(None, str1, str2).ratio()

    async def run_consensus_check(self, task_id: int):
        with Session(engine) as session:
            task = session.get(TaskResult, task_id)
            if not task:
                return

            assignments = [a for a in task.assignments if a.status == "submitted"]

            # Supporting multiple worker assignments (redundancy threshold)
            if len(assignments) < 3:
                return

            scores = []
            for i in range(len(assignments)):
                for j in range(i + 1, len(assignments)):
                    try:
                        data_i = json.loads(assignments[i].label_data)
                        data_j = json.loads(assignments[j].label_data)
                        if isinstance(data_i, dict) and 'x' in data_i:
                            scores.append(self.calculate_iou(data_i, data_j))
                        else:
                            scores.append(self.calculate_semantic_similarity(str(data_i), str(data_j)))
                    except:
                        scores.append(0.0)

            avg_agreement = sum(scores) / len(scores) if scores else 0

            # Triggering payout when agreement exceeds 95%
            if avg_agreement >= 0.95:
                task.status = TaskStatus.VERIFIED
                task.accuracy = avg_agreement

                for assignment in assignments:
                    annotator = session.get(Annotator, assignment.annotator_id)
                    if annotator:
                        annotator.verified_tasks_count += 1

                session.add(task)
                session.commit()
                # Mock Solana Payout Trigger
                await self.trigger_solana_payout(task_id, avg_agreement)

    async def trigger_solana_payout(self, task_id: int, score: float):
        print(f"[SOLANA PAYOUT] Task {task_id} verified with {score*100:.1f}% consensus. Transferring 0.05 USDC...")
        # Simulating solana-service call
        # httpx.post("http://solana-service:3001/pay", ...)

consensus_service = ConsensusService()
