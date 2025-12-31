# Project Tracker Dashboard

Real-time visual dashboard for Claude Role Framework development progress.

## Features

- Live todo tracking with status updates
- Agent activity monitoring
- File statistics and metrics
- Project timeline visualization
- Quality score tracking
- Auto-refresh every 5 seconds (HTMX)

## Tech Stack

- **Backend:** FastAPI (Python)
- **Frontend:** HTMX + TailwindCSS
- **Server:** uvicorn
- **Package Manager:** uv

## Quick Start

```bash
# Install dependencies with uv
cd project-tracker
uv sync

# Run the dashboard
uv run uvicorn src.project_tracker.main:app --reload --port 8890

# Open in browser
open http://localhost:8890
```

## Development

```bash
# Run with auto-reload
uv run uvicorn src.project_tracker.main:app --reload --port 8890

# Check health
curl http://localhost:8890/health
```

## API Endpoints

- `GET /` - Main dashboard
- `GET /api/progress` - Project metrics
- `GET /api/files` - File statistics
- `GET /api/todos` - Todo list
- `GET /api/agents` - Agent activity
- `GET /api/timeline` - Timeline data
- `GET /health` - Health check

## Structure

```
project-tracker/
├── src/project_tracker/
│   ├── main.py              # FastAPI app
│   ├── routes/              # Route handlers
│   ├── services/            # Business logic
│   └── templates/           # HTML templates
├── static/                  # CSS/JS files
└── pyproject.toml           # uv configuration
```

## Auto-Refresh

The dashboard uses HTMX to auto-refresh components:
- Progress cards: Every 5 seconds
- Todos: Every 5 seconds
- Agents: Every 5 seconds
- Timeline: Every 10 seconds
- Files: Every 10 seconds

## CLI Vibe Coding Showcase

This dashboard demonstrates modern Python development:
- Fast development with uv
- Lightweight frontend (no build step)
- Real-time updates without complexity
- Production-ready code structure
