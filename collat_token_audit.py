import requests
import json
import time
from datetime import datetime

# --- Configuration ---
SOLSCAN_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOjE3NTM4NTMxMjI0MjksImVtYWlsIjoic2VtaS1jb25kdWN0b3ItZnV0dXJlQGllZWUub3JnIiwiYWN0aW9uIjoidG9rZW4tYXBpIiwiYXBpVmVyc2lvbiI6InYyIiwiaWF0IjoxNzUzODUzMTIyfQ.GxWsoRHSJcpN3JySNwt0GgnNbbcHy83olpmi0L-edKo"
TOKEN_ADDRESS = "GyKKrkrrQh8gD9kXEpWw5cdELxYNUJ9EBH4HKtgDpump"
INTERVAL_SECONDS = 3600  # e.g. poll every 1 hour
VAULT_MANIFEST_PATH = "vault_manifest.json"
CIDEX_LOG_PATH = "cidex_token_registry.json"

# --- API Function ---
def fetch_token_metadata():
    url = f"https://pro-api.solscan.io/v2.0/token/meta?address={TOKEN_ADDRESS}"
    headers = {"token": SOLSCAN_API_KEY}
    response = requests.get(url, headers=headers)
    return response.json() if response.ok else None

# --- Audit Hook ---
def audit_token_metadata():
    data = fetch_token_metadata()
    if data and data.get("success"):
        log = data["data"]
        log["log_timestamp"] = datetime.utcnow().isoformat()

        # Save to CIDEX registry
        with open(CIDEX_LOG_PATH, "a") as cidex:
            json.dump(log, cidex)
            cidex.write("\n")

        print("✅ Logged metadata update for:", log["name"])
        return log
    else:
        print("❌ Failed to retrieve metadata from Solscan.")
        return None

# --- Vault Manifest Update ---
def update_vault_manifest(log):
    try:
        with open(VAULT_MANIFEST_PATH, "r") as f:
            manifest = json.load(f)
    except FileNotFoundError:
        manifest = {}

    manifest[TOKEN_ADDRESS] = {
        "symbol": log["symbol"],
        "market_cap": log.get("market_cap_usd"),
        "holders": log.get("holder"),
        "price": log.get("price"),
        "last_updated": log["log_timestamp"]
    }

    with open(VAULT_MANIFEST_PATH, "w") as f:
        json.dump(manifest, f, indent=2)
        print("📁 Vault manifest updated.")

# --- Conditional LP/DAO Trigger (placeholder) ---
def trigger_actions_if_needed(log):
    if float(log.get("price", 0)) < 0.04:
        print("🚨 Price dropped below threshold. Consider DAO vote or LP withdrawal.")
    if log.get("holder", 0) > 2000:
        print("🎉 Milestone: 2,000 holders reached! DAO bonus unlock trigger?")

# --- Run Once ---
def run_audit_cycle():
    log = audit_token_metadata()
    if log:
        update_vault_manifest(log)
        trigger_actions_if_needed(log)

# --- Batch/Loop ---
if __name__ == "__main__":
    while True:
        run_audit_cycle()
        time.sleep(INTERVAL_SECONDS)
