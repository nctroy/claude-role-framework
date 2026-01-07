# Session State: Start Here On Return

*   **Timestamp:** 2025-12-31 22:58:00
*   **Current Task:** Investigating local processes and identifying web services across various system ports.
*   **Key Decisions:**
    *   Identified that `lsof -iTCP -sTCP:LISTEN -n -P` is the optimal way to see all "doors" (ports) currently open and waiting for connections.
    *   Determined that `ps -fp <PID>` is necessary to reveal the specific project or file path running behind a generic command like `python` or `node`.
    *   Decided to use `curl -I` as the definitive test to see if a port is speaking "Web" (HTTP) or a different protocol.
*   **Next Steps:**
    *   Run `curl -I http://localhost:3000` to confirm if the Node process is a web application.
    *   Investigate the source of the Node process on port 3000 if it is relevant to the framework.
    *   Resume exploration of the `claude-role-framework` codebase.
*   **Relevant Files:**
    *   `project-tracker/src/project_tracker/main.py` (The app on port 8890).
*   **Contextual Notes:**
    *   Port 8890: Project Tracker (Python/FastAPI).
    *   Port 3000: Active Node process (likely a frontend).
    *   Port 5000/7000: MacOS system services (Control Center), not web servers.
    *   Port 11434: Ollama API.
