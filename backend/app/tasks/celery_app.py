from celery import Celery
from app.core.config import settings

celery_app = Celery("worker", broker=settings.REDIS_URL, backend=settings.REDIS_URL)

@celery_app.task
def sample_task(name: str):
    return f"Hello {name}, task completed!"
