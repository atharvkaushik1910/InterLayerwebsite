import os

def update_env(file_path, updates):
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    with open(file_path, 'r') as f:
        lines = f.readlines()

    new_lines = []
    processed_keys = set()

    for line in lines:
        key = line.split('=')[0].strip()
        if key in updates:
            new_lines.append(f"{key}={updates[key]}\n")
            processed_keys.add(key)
        else:
            new_lines.append(line)

    # Add missing keys
    for key, value in updates.items():
        if key not in processed_keys:
            new_lines.append(f"{key}={value}\n")

    with open(file_path, 'w') as f:
        f.writelines(new_lines)
    
    print(f"Updated {file_path} with: {updates}")

if __name__ == "__main__":
    updates = {
        "TAVUS_API_KEY": "3ad456cd8f1e489396bc7652777c58b2",
        "TAVUS_REPLICA_ID": "r6ae5b6efc9d",
        "TAVUS_PERSONA_ID": "pafb14516370"
    }
    update_env(".env", updates)
