"""FastAPI application for project tracker dashboard."""

from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from .routes import dashboard, api

# Initialize FastAPI app
app = FastAPI(
    title="Claude Role Framework - Project Tracker",
    description="Real-time project progress dashboard",
    version="0.1.0"
)

# Get paths
BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR.parent.parent / "static"
TEMPLATES_DIR = BASE_DIR / "templates"

# Mount static files
app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

# Setup templates
templates = Jinja2Templates(directory=str(TEMPLATES_DIR))

# Include routers
app.include_router(dashboard.router)
app.include_router(api.router, prefix="/api")


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "project-tracker"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8890, reload=True)
