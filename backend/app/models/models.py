from sqlmodel import SQLModel, Field, Relationship
from typing import List, Optional
from datetime import datetime

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

class Wallet(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    address: str = Field(unique=True)
    label: str
    balance: float = 0.0

class TaskResult(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    project_id: int = Field(foreign_key="project.id")
    external_task_id: int
    data: str # JSON string of result
    annotator_id: Optional[int] = Field(default=None, foreign_key="annotator.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
