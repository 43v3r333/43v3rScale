import json
from datetime import datetime
from sqlmodel import Session, select
from app.models.models import TaskResult, TaskStatus, Assignment, Project, Annotator

class DataPipeline:
    async def process_label_studio(self, payload: dict, session: Session):
        action = payload.get("action")
        if action in ["ANNOTATION_CREATED", "ANNOTATION_UPDATED"]:
            task_data = payload.get("task", {})
            annotation = payload.get("annotation", {})

            # Map worker (using LS user id as placeholder)
            # In production, we'd look up Annotator by LS user mapping
            annotator_id = 1

            # Create/Update Assignment
            assignment = Assignment(
                task_id=1, # Mocked task ID mapping
                annotator_id=annotator_id,
                label_data=json.dumps(annotation.get("result")),
                submitted_at=datetime.utcnow(),
                status="submitted"
            )
            session.add(assignment)
            await self._check_consensus_trigger(1, session)
            session.commit()

    async def process_cvat(self, payload: dict, session: Session):
        event = payload.get("event")
        if event == "completed:job":
            job = payload.get("job", {})
            # Similar logic for CVAT
            assignment = Assignment(
                task_id=1,
                annotator_id=1,
                label_data=json.dumps(payload.get("annotations", [])),
                submitted_at=datetime.utcnow(),
                status="submitted"
            )
            session.add(assignment)
            await self._check_consensus_trigger(1, session)
            session.commit()

    async def _check_consensus_trigger(self, task_id: int, session: Session):
        task = session.get(TaskResult, task_id)
        if not task: return

        project = session.get(Project, task.project_id)
        assignments_count = len([a for a in task.assignments if a.status == "submitted"])

        if assignments_count >= project.redundancy_count:
            task.status = TaskStatus.AWAITING_CONSENSUS # Or AWAITING_CONSENSUS as per status name
            session.add(task)

data_pipeline = DataPipeline()
