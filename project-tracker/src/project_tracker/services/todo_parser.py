"""Parse and track todos."""

from pathlib import Path


def parse_todos(project_root: Path) -> dict:
    """Parse current todo list."""

    # These would normally be read from a state file or database
    # For now, hardcoded based on current state
    todos = [
        {
            "id": 1,
            "content": "Create Phase 1 implementation plan document",
            "status": "completed",
            "category": "planning"
        },
        {
            "id": 2,
            "content": "Define PoC scope and success criteria",
            "status": "completed",
            "category": "planning"
        },
        {
            "id": 3,
            "content": "Stop framework viewer server and clean up",
            "status": "completed",
            "category": "infrastructure"
        },
        {
            "id": 4,
            "content": "Save raw conversation log for digital twin project",
            "status": "completed",
            "category": "documentation"
        },
        {
            "id": 5,
            "content": "Initialize Git repository for project",
            "status": "completed",
            "category": "infrastructure"
        },
        {
            "id": 6,
            "content": "Create bespoke visual project tracker dashboard",
            "status": "in_progress",
            "category": "tooling"
        },
        {
            "id": 7,
            "content": "Hand off Phase 1 implementation to Gemini",
            "status": "pending",
            "category": "coordination"
        },
        {
            "id": 8,
            "content": "Review Gemini's Phase 1 code for quality",
            "status": "pending",
            "category": "quality"
        },
        {
            "id": 9,
            "content": "Create demo video showing PoC in action",
            "status": "pending",
            "category": "demo"
        },
        {
            "id": 10,
            "content": "Package submission for Anthropic",
            "status": "pending",
            "category": "delivery"
        }
    ]

    # Calculate stats
    completed = len([t for t in todos if t["status"] == "completed"])
    in_progress = len([t for t in todos if t["status"] == "in_progress"])
    pending = len([t for t in todos if t["status"] == "pending"])

    return {
        "todos": todos,
        "stats": {
            "total": len(todos),
            "completed": completed,
            "in_progress": in_progress,
            "pending": pending,
            "completion_rate": round((completed / len(todos)) * 100, 1)
        }
    }
