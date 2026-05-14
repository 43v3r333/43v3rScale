from celery import Celery
from app.core.config import settings

celery_app = Celery("worker", broker=settings.REDIS_URL, backend=settings.REDIS_URL)

@celery_app.task
def sample_task(name: str):
    return f"Hello {name}, task completed!"
import httpx

@celery_app.task
def process_approved_task(task_id: int):
    # Logic to fetch task and annotator, then call solana-service
    # amount = 0.05 # USDC amount
    # httpx.post("http://solana-service:3001/pay", json={"workerAddress": addr, "amount": amount})
    pass

@celery_app.task
def check_milestone(annotator_id: int):
    # Logic to check if 100 high-accuracy tasks reached
    # httpx.post("http://solana-service:3001/mint-sbt", json={"workerAddress": addr})
    pass
