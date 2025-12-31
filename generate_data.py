import json
import os
import glob

def generate_data_js():
    data = {
        "domains": [],
        "roles": []
    }
    
    # Base path for examples
    base_path = "examples"
    
    # Get all JSON files
    files = glob.glob(os.path.join(base_path, "**/*.json"), recursive=True)
    
    for file_path in files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = json.load(f)
                
            # Determine if domain or role
            # Heuristic: check filename or content fields
            filename = os.path.basename(file_path)
            
            if filename == "domain.json" or "roles" in content:
                # Add file path for reference if needed
                content['_filePath'] = file_path
                data["domains"].append(content)
            else:
                content['_filePath'] = file_path
                data["roles"].append(content)
                
        except Exception as e:
            print(f"Error reading {file_path}: {e}")

    # Write to data.js
    js_content = f"window.CRF_DATA = {json.dumps(data, indent=2)};"
    
    with open("data.js", "w", encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"Generated data.js with {len(data['domains'])} domains and {len(data['roles'])} roles.")

if __name__ == "__main__":
    generate_data_js()
