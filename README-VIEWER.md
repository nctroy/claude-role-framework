# Claude Role Framework Viewer

A local, offline-capable viewer for the Claude Role Framework JSON definitions.

## How to Use

1. **Open `viewer.html`** in any modern web browser.
   - It uses the `file://` protocol, so no server is required.

2. **Loading Data**:
   - **Default**: The viewer attempts to load data from `data.js`. This file is pre-generated.
   - **Live/Local**: Click **"Load Local Folder"** and select the `examples/` directory. This allows you to view changes to JSON files immediately without regenerating `data.js`.

## Features

- **Explorer**: Browse domains and roles.
- **Details**: View comprehensive role definitions (Skills, MCPs, Context).
- **Composition**: Check multiple roles to see combined skill requirements.
- **Skill Visualization**: See which skills are most frequently reused across the selected set.

## Updating `data.js` (Optional)

If you prefer the default view to be up-to-date without selecting the folder every time, you can regenerate the data file using the included Python script:

```bash
python3 generate_data.py
```
