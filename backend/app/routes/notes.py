"""Notes routes — list all notes and create new ones."""

from __future__ import annotations

from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import Note

router = APIRouter()


class NoteCreate(BaseModel):
    title: str | None = Field(default=None, max_length=200)
    body: str = Field(min_length=1)


class NoteOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    body: str
    created_at: datetime


@router.get("/notes", response_model=list[NoteOut])
def list_notes(db: Session = Depends(get_db)) -> list[Note]:
    stmt = select(Note).order_by(Note.created_at.desc(), Note.id.desc())
    return list(db.scalars(stmt).all())


@router.post("/notes", response_model=NoteOut, status_code=status.HTTP_201_CREATED)
def create_note(payload: NoteCreate, db: Session = Depends(get_db)) -> Note:
    body = payload.body.strip()
    if not body:
        raise HTTPException(status_code=422, detail="body must not be empty")
    note = Note(title=(payload.title or "").strip(), body=body)
    db.add(note)
    db.commit()
    db.refresh(note)
    return note
