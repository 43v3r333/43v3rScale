from fastapi import APIRouter
from app.api.endpoints import projects, annotators, wallets, auth, webhooks

api_router = APIRouter()
api_router.include_router(auth.router, tags=["auth"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(annotators.router, prefix="/annotators", tags=["annotators"])
api_router.include_router(wallets.router, prefix="/wallets", tags=["wallets"])
api_router.include_router(webhooks.router, prefix="/webhooks", tags=["webhooks"])
