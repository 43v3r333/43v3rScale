# 43v3rScale — Agent Quick Reference

> AI Data Engine. Monorepo with 4 services: **backend** (FastAPI), **frontend** (Next.js 16), **solana-service** (Node/Express), **contracts** (Anchor/Solana).

## Quick start (dev)

```bash
# Everything via Docker Compose — requires Docker running
docker compose up           # all services: db, redis, backend, worker, frontend, solana-service, label-studio, cvat
docker compose up -d        # detached mode
```

| Service   | Port   | Notes                                    |
|-----------|--------|------------------------------------------|
| Backend   | 8000   | Uvicorn, hot-reload in compose           |
| Frontend  | 3000   | Next.js dev server                       |
| Solana    | 3001   | Express, connects to Solana devnet       |
| Label Studio | 8080 | Heartex, auto-creates project            |
| CVAT      | 8081   | CVAT server                              |

## Architecture overview

```
root/
├── backend/          # FastAPI + SQLModel + PostgreSQL + Redis + Celery
│   ├── app/
│   │   ├── api/       # Route definitions (projects, annotators, wallets, tasks, auth, webhooks)
│   │   ├── core/      # Config (pydantic-settings), DB session
│   │   ├── models/    # SQLModel ORM models
│   │   ├── services/  # Business logic (pipeline, consensus, inference_agent, router)
│   │   └── tasks/     # Celery tasks (celery_app, reputation)
│   ├── alembic/       # DB migrations
│   └── Dockerfile
├── frontend/          # Next.js 16 App Router, Tailwind v4, TypeScript
│   ├── src/app/       # App Router pages (/, /projects, /annotators, /wallets, /cvat, /workforce)
│   ├── src/components/
│   ├── src/lib/
│   └── Dockerfile
├── solana-service/    # Express + @solana/web3.js + Anchor, devnet by default
├── contracts/         # Anchor programs (payout_escrow)
└── docker-compose.yml
```

## Key commands

### Backend
```bash
# Run locally (without Docker)
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload          # http://localhost:8000

# Run Celery worker locally
celery -A app.tasks.celery_app worker --loglevel=info

# Alembic migrations
alembic revision --autogenerate -m "description"
alembic upgrade head
```

### Frontend
```bash
cd frontend
npm install
npm run dev              # http://localhost:3000
npm run build            # production build
npm run lint             # ESLint (configured via eslint.config.mjs)
```

### Solana service
```bash
cd solana-service
npm install
node index.js            # http://localhost:3001
```

### Testing
```bash
cd backend
python -m pytest backend/tests/test_main.py
```

## Environment variables (docker-compose sets these)

| Variable            | Default (compose)                              |
|---------------------|------------------------------------------------|
| `DATABASE_URL`      | `postgresql://user:pass@db:5432/db`            |
| `REDIS_URL`         | `redis://redis:6379/0`                         |
| `SECRET_KEY`        | `supersecret`                                  |
| `SOLANA_RPC_URL`    | `https://api.devnet.solana.com`                |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000/api/v1`               |

## API surface

All endpoints are under `/api/v1` (defined in `backend/app/core/config.py`).

| Prefix             | Tags            |
|--------------------|-----------------|
| `/auth`            | auth            |
| `/projects`        | projects        |
| `/annotators`      | annotators      |
| `/wallets`         | wallets         |
| `/tasks`           | tasks (+ SSE `/stream`) |
| `/webhooks/label-studio` | webhooks |
| `/webhooks/cv-at`  | webhooks        |

## Task status lifecycle

`PENDING` → `AI_DRAFTED` → `ASSIGNED` → `HUMAN_REVIEWED` → `AWAITING_CONSENSUS` → `CONSENSUS_REACHED` → `FINALIZED` (or `REJECTED` / `ESCALATED`)

## Gotchas

- **SQLModel**, not raw SQLAlchemy — models live in `backend/app/models/models.py` and double as Pydantic schemas.
- **Celery worker** is a separate compose service sharing the same image as backend but running `celery -A app.tasks.celery_app worker`.
- **Frontend uses App Router** exclusively — no `pages/` directory. Layout is in `src/app/layout.tsx`, global CSS in `src/app/globals.css`.
- **Next.js 16** — the existing `frontend/AGENTS.md` notes breaking API changes from training data. Check `node_modules/next/dist/docs/` before writing new components.
- **Label Studio and CVAT** run in Docker Compose for annotation workflows; webhooks feed results into the backend pipeline (`app/services/pipeline.py`).
- **Solana service** uses devnet by default. The payment and mint-SBT endpoints are stubs (`simulated_anchor_tx_signature`).
- **Alembic** config (`alembic.ini`) has a hardcoded dev DB URL — update it or rely on env override for migrations.