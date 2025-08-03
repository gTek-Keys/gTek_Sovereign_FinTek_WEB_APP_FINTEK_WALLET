import requests
import os
from pathlib import Path

token = os.getenv("WEB3_STORAGE_TOKEN")
dir_path = Path("public/cidex-metadata")

def upload_file(fpath):
    if not token:
        print("❌ Missing WEB3_STORAGE_TOKEN environment variable.")
        return
    headers = {
        "Authorization": f"Bearer {token}"
    }
    files = {
        "file": (fpath.name, fpath.open("rb"))
    }
    response = requests.post("https://api.web3.storage/upload", headers=headers, files=files)
    result = response.json()
    print(f"✅ Uploaded {fpath.name} to CID: {result.get('cid')}")
    return result

for f in dir_path.glob("*.json"):
    upload_file(f)

