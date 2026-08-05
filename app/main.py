"""FastAPI entry point. Deploy imports ``app.main:app`` — keep both names."""

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db import init_db
from app.routes import api_router

app = FastAPI(title=os.getenv("APP_NAME", "notes"))

# Allowed origins come from the environment so the deployed app and local dev
# use the same code path. "*" only when nothing is configured (dev default).
_origins = [o.strip() for o in os.getenv("CORS_ORIGINS", "*").split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def _startup() -> None:
    init_db()


# The one place the /api prefix is applied. Route modules must not repeat it.
app.include_router(api_router, prefix="/api")
