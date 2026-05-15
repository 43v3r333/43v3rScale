import json
from difflib import SequenceMatcher
from typing import List
from sqlmodel import Session, select
from app.models.models import TaskResult, TaskStatus, Assignment, Project, WorkerWallet
from app.core.db import engine

class ConsensusService:
    @staticmethod
    def calculate_iou(box1: dict, box2: dict) -> float:
        """Calculate IoU for bounding boxes"""
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
    def calculate_similarity(str1: str, str2: str) -> float:
        """Calculate string similarity using SequenceMatcher"""
        return SequenceMatcher(None, str1, str2).ratio()

    async def evaluate_consensus(self, task_id: int):
        with Session(engine) as session:
            task = session.get(TaskResult, task_id)
            assignments = [a for a in task.assignments if a.status == "submitted"]

            if len(assignments) < 3:
                return

            # Pairwise consensus check
            scores = []
            for i in range(len(assignments)):
                for j in range(i + 1, len(assignments)):
                    # For demo, assuming data is a simple string or box
                    scores.append(self.calculate_similarity(assignments[i].label_data, assignments[j].label_data))

            avg_score = sum(scores) / len(scores) if scores else 0

            if avg_score >= 0.90:
                task.status = TaskStatus.FINALIZED
                session.add(task)
                session.commit()
                await self.trigger_payout(task, assignments)

    async def trigger_payout(self, task: TaskResult, assignments: List[Assignment]):
        print(f"Consensus reached for task {task.id}. Triggering Solana payouts...")
        # Placeholder for solana-py integration logic
        pass

consensus_service = ConsensusService()

    async def trigger_payout_on_chain(self, worker_pubkey: str, amount_usdc: int):
        from solana.rpc.async_api import AsyncClient
        from solana.transaction import Transaction
        from solana.keypair import Keypair
        import base58

        # In a real app, load authority_keypair from env
        # authority_keypair = Keypair.from_secret_key(base58.b58decode(os.getenv("SOLANA_PRIVATE_KEY")))

        print(f"Executing on-chain payout to {worker_pubkey} for {amount_usdc} micro-USDC")
        # Integration logic to call Anchor program 'escrow_payout'
        # async with AsyncClient("https://api.devnet.solana.com") as client:
        #    ...
