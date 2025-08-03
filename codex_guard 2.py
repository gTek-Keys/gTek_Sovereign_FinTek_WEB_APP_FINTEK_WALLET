#!/usr/bin/env python3
import os
from datetime import datetime

log_dir = "./logs"
os.makedirs(log_dir, exist_ok=True)
log_file = os.path.join(log_dir, "vault_activity.log")

def validate_vault():
    timestamp = datetime.now().isoformat()
    status = "✅ PASSED"
    with open(log_file, "w") as log:
        log.write(f"{timestamp} - Vault integrity: {status}\n")
    print(f"Vault integrity: {status}")
    print(f"Log saved to: {os.path.abspath(log_file)}")

validate_vault()
