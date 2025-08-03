import os
import datetime

# Define the audit range
start_date = datetime.datetime(2025, 1, 1)
end_date = datetime.datetime(2025, 4, 1)

# Directories to scan (you can modify these as needed)
directories = [
    os.path.expanduser("~/Documents"),
    os.path.expanduser("~/Downloads"),
    os.getcwd(),
]

# File extensions and types of interest
file_types = [".txt", ".json", ".py", ".sh", ".log", ".md"]

def scan_files(path):
    results = []
    for root, dirs, files in os.walk(path):
        for file in files:
            if any(file.endswith(ext) for ext in file_types):
                full_path = os.path.join(root, file)
                try:
                    mod_time = datetime.datetime.fromtimestamp(os.path.getmtime(full_path))
                    if start_date <= mod_time <= end_date:
                        results.append((file, full_path, mod_time.isoformat()))
                except Exception as e:
                    print(f"Error reading {file}: {e}")
    return results

# Perform audit
audit_results = []
for directory in directories:
    audit_results.extend(scan_files(directory))

# Write results to log
log_file = "hyperdigestive_audit_log.json"
with open(log_file, "w") as log:
    import json
    json.dump(audit_results, log, indent=4)

print(f"Audit complete. Results saved in {log_file}")

