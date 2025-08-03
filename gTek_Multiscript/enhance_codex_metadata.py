import json
from datetime import datetime
from pathlib import Path

def enhance_metadata(file_path, did):
    path = Path(file_path)
    if not path.exists():
        print(f"❌ File not found: {file_path}")
        return

    with path.open("r") as f:
        data = json.load(f)

    data["issuer"] = did
    data["enhanced_at"] = datetime.utcnow().isoformat() + "Z"

    with path.open("w") as f:
        json.dump(data, f, indent=4)

enhance_metadata("../public/cidex-metadata/mHi_CodexNFT_Metadata.json",
                 "did:key:z6Mkmjo7JF8riApYrfpqfVxyEDG9sVfMvZx65pUS5ErbSNDA")

