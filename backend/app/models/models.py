from sqlmodel import SQLModel, Field, Relationship
from typing import List, Optional
from datetime import datetime
from enum import Enum

class TaskStatus(str, Enum):
    AI_UNCERTAIN = "ai_uncertain"
    ASSIGNED = "assigned"
    AWAITING_CONSENSUS = "awaiting_consensus"
    COMPLETED = "completed"
    ARBITRATION = "arbitration"
    PENDING = "pending"
    REJECTED = "rejected"
    VERIFIED = "verified"

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
    redundancy_count: int = Field(default=3)
    vault_address: Optional[str] = None
    balance_usdc: float = Field(default=0.0)
    funding_active: bool = Field(default=False)
    owner_id: int = Field(foreign_key="user.id")
    owner: User = Relationship(back_populates="projects")

class Annotator(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str = Field(unique=True)
    skill_level: str = "beginner"
    consensus_score: float = Field(default=0.0)
    tasks_completed: int = Field(default=0)
    verified_tasks_count: int = Field(default=0)
    is_qualified: bool = Field(default=False)
    sbt_minted: bool = Field(default=False)
    wallets: List["WorkerWallet"] = Relationship(back_populates="annotator")
    assignments: List["Assignment"] = Relationship(back_populates="annotator")

class WorkerWallet(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    annotator_id: int = Field(foreign_key="annotator.id")
    public_key: str = Field(unique=True)
    is_primary: bool = True
    annotator: Annotator = Relationship(back_populates="wallets")

class TransactionRecord(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    tx_hash: str = Field(unique=True)
    amount: float
    type: str # DEPOSIT, PAYOUT
    project_id: Optional[int] = Field(default=None, foreign_key="project.id")
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class TaskResult(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    project_id: int = Field(foreign_key="project.id")
    external_task_id: int
    data: str # JSON string
    status: TaskStatus = Field(default=TaskStatus.PENDING)
    confidence: float = Field(default=0.0)
    is_gold_standard: bool = Field(default=False)
    ground_truth_data: Optional[str] = None
    tx_signature: Optional[str] = None
    final_result: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    assignments: List["Assignment"] = Relationship(back_populates="task")

class Assignment(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    task_id: int = Field(foreign_key="taskresult.id")
    annotator_id: int = Field(foreign_key="annotator.id")
    raw_data: Optional[str] = None
    consensus_score: float = Field(default=0.0)
    status: str = Field(default="pending")
    submitted_at: Optional[datetime] = None
    task: TaskResult = Relationship(back_populates="assignments")
    annotator: Annotator = Relationship(back_populates="assignments")

class Wallet(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    address: str = Field(unique=True)
    label: str
    balance: float = 0.0
