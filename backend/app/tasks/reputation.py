from sqlmodel import Session, select
from app.core.db import engine
from app.models.models import Annotator, WorkerReputation
import httpx

async def update_worker_reputation(annotator_id: int, task_accuracy: float):
    with Session(engine) as session:
        annotator = session.get(Annotator, annotator_id)
        if not annotator:
            return

        annotator.tasks_completed += 1
        # Simple moving average for consensus score
        annotator.consensus_score = (
            (annotator.consensus_score * (annotator.tasks_completed - 1)) + task_accuracy
        ) / annotator.tasks_completed

        if task_accuracy >= 0.99:
            annotator.high_accuracy_count += 1

        if annotator.high_accuracy_count >= 100 and annotator.consensus_score >= 0.99 and not annotator.sbt_minted:
            # Trigger Solana SBT minting
            async with httpx.AsyncClient() as client:
                try:
                    await client.post("http://solana-service:3001/mint-sbt", json={
                        "workerAddress": annotator.solana_address,
                        "status": "Expert"
                    })
                    annotator.sbt_minted = True
                except Exception as e:
                    print(f"Failed to mint SBT: {e}")

        session.add(annotator)
        session.commit()
