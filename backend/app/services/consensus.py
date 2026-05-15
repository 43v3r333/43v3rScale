from sqlmodel import Session, select
from app.models.models import TaskResult, TaskConsensus, TaskStatus, WorkerWallet
from app.core.db import engine
import httpx

class ConsensusService:
    @staticmethod
    async def process_new_label(task_id: int, result_data: str):
        with Session(engine) as session:
            # Check for existing consensus record
            consensus = session.exec(
                select(TaskConsensus).where(TaskConsensus.task_id == task_id)
            ).first()

            if not consensus:
                consensus = TaskConsensus(task_id=task_id, agreement_count=1)
                session.add(consensus)
            else:
                consensus.agreement_count += 1
                if consensus.agreement_count >= 2: # Consensus threshold
                    consensus.consensus_reached = True
                    consensus.final_result = result_data

                    # Update Task Status
                    task = session.get(TaskResult, task_id)
                    if task:
                        task.status = TaskStatus.CONSENSUS_REACHED
                        session.add(task)

                        # Trigger Payment event
                        await ConsensusService.trigger_payment(task)

            session.commit()

    @staticmethod
    async def trigger_payment(task: TaskResult):
        # Placeholder for label_finalized event -> Solana payment
        print(f"Triggering payment for task {task.id}")
        # In a real scenario, fetch worker wallet and call solana-service
        task.status = TaskStatus.FINALIZED
        # Simulated call to solana-service
        try:
            async with httpx.AsyncClient() as client:
                await client.post("http://solana-service:3001/pay", json={
                    "workerAddress": "HN7c...6v9p",
                    "amount": 0.05
                })
        except Exception as e:
            print(f"Payment simulation failed: {e}")

consensus_service = ConsensusService()
