from sqlmodel import SQLModel, Field, Relationship
from typing import List, Optional
from datetime import datetime
from enum import Enum

class TaskStatus(str, Enum):
    PENDING = "pending"
    AI_DRAFTED = "ai_drafted"
    HUMAN_REVIEWED = "human_reviewed"
    CONSENSUS_REACHED = "consensus_reached"
    FINALIZED = "finalized"
    REJECTED = "rejected"

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str
    is_active: bool = True
    projects: List["Project"] = Relationship(back_populates="owner")

class Project(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    description: Optional[str] = None
    owner_id: int = Field(foreign_key="user.id")
    owner: User = Relationship(back_populates="projects")

class Annotator(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str = Field(unique=True)
    skill_level: str = "beginner"
    high_accuracy_count: int = Field(default=0)
    sbt_minted: bool = Field(default=False)
    consensus_score: float = Field(default=0.0)
    tasks_completed: int = Field(default=0)
    wallets: List["WorkerWallet"] = Relationship(back_populates="annotator")

class WorkerWallet(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    annotator_id: int = Field(foreign_key="annotator.id")
    public_key: str = Field(unique=True)
    is_primary: bool = True
    annotator: Annotator = Relationship(back_populates="wallets")

class WorkerReputation(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    annotator_id: int = Field(foreign_key="annotator.id")
    accuracy_history: str # JSON list
    expert_status: bool = False
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class TaskConsensus(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    task_id: int = Field(foreign_key="taskresult.id")
    agreement_count: int = Field(default=0)
    consensus_reached: bool = False
    final_result: Optional[str] = None # Final JSON result

class TaskResult(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    project_id: int = Field(foreign_key="project.id")
    external_task_id: int
    data: str # JSON string
    annotator_id: Optional[int] = Field(default=None, foreign_key="annotator.id")
    status: TaskStatus = Field(default=TaskStatus.PENDING)
    accuracy: float = Field(default=0.0)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Wallet(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    address: str = Field(unique=True)
    label: str
    balance: float = 0.0
