"""Scan project files for statistics."""

from pathlib import Path


def scan_project_files(project_root: Path) -> dict:
    """Scan and categorize project files."""

    categories = {
        "schemas": [],
        "docs": [],
        "examples": [],
        "tools": [],
        "planning": [],
        "gui": [],
        "tracker": []
    }

    # Scan schemas
    if (project_root / "schemas").exists():
        categories["schemas"] = [f.name for f in (project_root / "schemas").glob("*.json")]

    # Scan docs
    if (project_root / "docs").exists():
        categories["docs"] = [f.name for f in (project_root / "docs").glob("*.md")]

    # Scan examples (count only)
    if (project_root / "examples").exists():
        categories["examples"] = [f.name for f in (project_root / "examples").rglob("*.json")]

    # Scan tools
    if (project_root / "tools" / "role-manager").exists():
        categories["tools"] = [f.name for f in (project_root / "tools" / "role-manager").glob("*.md")]

    # Planning files
    planning_files = ["SPECIFICATION.md", "PHASE1-PLAN.md", "PROJECT-TRACKER.md", "REVIEW-REPORT.md", "START_HERE.md"]
    categories["planning"] = [f for f in planning_files if (project_root / f).exists()]

    # GUI files
    if (project_root / "viewer.html").exists():
        categories["gui"] = ["viewer.html", "app.js", "styles.css", "data.js"]

    # Tracker files (this project)
    categories["tracker"] = ["Dashboard (in progress)"]

    # Calculate totals
    total = sum(len(files) for files in categories.values())

    return {
        "total": total,
        "by_category": {
            "Schemas": len(categories["schemas"]),
            "Documentation": len(categories["docs"]),
            "Examples": len(categories["examples"]),
            "CLI Tools": len(categories["tools"]),
            "Planning": len(categories["planning"]),
            "GUI Viewer": len(categories["gui"]),
            "Tracker": len(categories["tracker"])
        },
        "details": categories
    }
