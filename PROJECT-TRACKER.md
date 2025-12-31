# Project Tracker Dashboard - Design Specification

**Purpose:** Visual dashboard for Claude Role Framework development progress
**Technology:** Python FastAPI + HTMX + TailwindCSS (modern, lightweight)
**Port:** 8890 (8889 was framework viewer)

---

## Features

### 1. Real-Time Progress Tracking
- Live todo list with status updates
- Progress bars for each phase
- Completion percentages
- Time tracking estimates

### 2. Agent Activity Monitor
- Active agents and their tasks
- Agent completion status
- Review scores and feedback
- Agent performance metrics

### 3. File Statistics
- Files created by category
- Lines of code written
- Documentation coverage
- Test coverage metrics

### 4. Timeline Visualization
- Gantt-style timeline
- Milestones and deliverables
- Phase progression
- Critical path highlighting

### 5. Quality Metrics
- Review scores (like 98/100 from Principal Reviewer)
- Test coverage percentages
- Validation status
- Issue tracking

### 6. GitHub Integration (Future)
- Commit activity
- Branch status
- PR tracking
- CI/CD status

---

## Dashboard Layout

```
┌─────────────────────────────────────────────────────────┐
│  Claude Role Framework - Project Tracker                │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Phase 1     │  │  Files       │  │  Quality     │  │
│  │  Progress    │  │  Created     │  │  Score       │  │
│  │  ████░░ 65%  │  │  48 files    │  │  98/100      │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                          │
│  Active Todos (11)                                       │
│  ┌─────────────────────────────────────────────────┐   │
│  │ ✓ Create Phase 1 plan                           │   │
│  │ ✓ Define PoC scope                              │   │
│  │ ⚡ Create project tracker dashboard             │   │
│  │ ○ Initialize Git repository                     │   │
│  │ ○ Hand off to Gemini                            │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  Agent Activity                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 🟢 Schema Architect      [Completed] 98/100     │   │
│  │ 🟢 Documentation Writer  [Completed] 98/100     │   │
│  │ 🟢 Systems Architect     [Completed] 98/100     │   │
│  │ 🟢 Principal Reviewer    [Completed] 98/100     │   │
│  │ 🟡 Gemini (GUI Builder)  [Standby]              │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  Timeline                                                │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Week 1 ████████████████████░░░░░░░░░░░░░░░░░░░ │   │
│  │ Week 2 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## Technical Stack

### Backend
- **FastAPI** - Modern, fast Python web framework
- **uvicorn** - ASGI server
- **python-dotenv** - Environment variables
- **watchfiles** - File system monitoring

### Frontend
- **HTMX** - Dynamic updates without JavaScript complexity
- **TailwindCSS** - Utility-first styling
- **Alpine.js** - Minimal JavaScript framework (if needed)
- **Chart.js** - Progress visualizations

### Data Source
- Read PHASE1-PLAN.md for tasks
- Parse todo tracking files
- Monitor file system changes
- Track agent activity logs

---

## File Structure

```
project-tracker/
├── pyproject.toml              # uv project config
├── .python-version             # Python version
├── src/
│   └── project_tracker/
│       ├── __init__.py
│       ├── main.py             # FastAPI app
│       ├── routes/
│       │   ├── __init__.py
│       │   ├── dashboard.py    # Dashboard routes
│       │   └── api.py          # API endpoints
│       ├── services/
│       │   ├── __init__.py
│       │   ├── file_scanner.py # Scan project files
│       │   ├── todo_parser.py  # Parse todos
│       │   └── metrics.py      # Calculate metrics
│       └── templates/
│           ├── base.html
│           ├── dashboard.html
│           └── components/
│               ├── progress.html
│               ├── todos.html
│               ├── agents.html
│               └── timeline.html
├── static/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── dashboard.js
└── README.md
```

---

## API Endpoints

### GET /
- Main dashboard view

### GET /api/progress
- Returns current progress metrics
```json
{
  "phase": "Phase 1",
  "completion": 65,
  "todos": {
    "completed": 3,
    "in_progress": 1,
    "pending": 11
  }
}
```

### GET /api/files
- Returns file statistics
```json
{
  "total": 48,
  "by_category": {
    "schemas": 3,
    "docs": 4,
    "examples": 27,
    "tools": 5,
    "planning": 9
  }
}
```

### GET /api/agents
- Returns agent activity
```json
{
  "agents": [
    {
      "name": "Schema Architect",
      "status": "completed",
      "score": 98
    }
  ]
}
```

### GET /api/timeline
- Returns timeline data for visualization

---

## Live Updates (HTMX)

```html
<!-- Auto-refresh every 5 seconds -->
<div hx-get="/api/progress"
     hx-trigger="every 5s"
     hx-swap="innerHTML">
  <!-- Progress content -->
</div>
```

---

## uv Project Setup

```bash
# Initialize with uv
cd project-tracker
uv init
uv add fastapi uvicorn jinja2 python-multipart watchfiles

# Run
uv run uvicorn src.project_tracker.main:app --reload --port 8890
```

---

## Quick Start Commands

```bash
# Start dashboard
cd project-tracker
uv run uvicorn src.project_tracker.main:app --reload --port 8890

# Open browser
open http://localhost:8890
```

---

## Data Sources

### 1. Todo Tracking
- Parse todo list from session state
- Read PHASE1-PLAN.md tasks
- Track completion status

### 2. File Statistics
- Scan project directory
- Count files by type
- Calculate lines of code
- Track documentation

### 3. Agent Activity
- Read REVIEW-REPORT.md
- Parse agent completion logs
- Track review scores

### 4. Timeline
- Parse PHASE1-PLAN.md dates
- Calculate progress
- Project completion estimates

---

## Future Enhancements

1. **GitHub Integration**
   - Commit graph
   - PR status
   - CI/CD pipeline status

2. **Real-Time Collaboration**
   - WebSocket updates
   - Multi-user tracking
   - Agent coordination visualization

3. **Export Reports**
   - PDF progress reports
   - Markdown summaries
   - Chart exports

4. **Notifications**
   - Desktop notifications for milestones
   - Slack/Discord webhooks
   - Email reports

---

## CLI Vibe Coding Showcase

This dashboard demonstrates:
- Modern Python tooling (uv, FastAPI)
- Lightweight frontend (HTMX + Tailwind)
- Real-time updates without complexity
- Project management visualization
- Perfect for demo/portfolio

---

**End of Tracker Specification**
