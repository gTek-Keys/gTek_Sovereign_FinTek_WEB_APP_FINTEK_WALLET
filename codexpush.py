
import argparse
import json
import os
from datetime import datetime

def generate_metadata(output_dir):
    os.makedirs(output_dir, exist_ok=True)

    codex_data = {
        "Claude_CodexNFT_Metadata.json": {
            "name": "Codex Drop – Claude",
            "description": "Ritual licensing validator for GPT personas. Claude generates IP logic and schema output.",
            "image": "ipfs://CID/ritual_card_claude.png",
            "external_url": "https://gtekglobal.design/codex/claude",
            "attributes": [
                {"trait_type": "Persona", "value": "Claude"},
                {"trait_type": "Function", "value": "IP Logic + Licensing"},
                {"trait_type": "CodexPhase", "value": "14.2"},
                {"trait_type": "License", "value": "gTek Sovereign Codex v3.0"},
                {"trait_type": "Chain", "value": "Ethereum"}
            ]
        },
        "Dante_CodexNFT_Metadata.json": {
            "name": "Codex Drop – Dante",
            "description": "Narrative synthesis architect for GPT CodexShell. Dante weaves poetic audit scrolls.",
            "image": "ipfs://CID/ritual_card_dante.png",
            "external_url": "https://gtekglobal.design/codex/dante",
            "attributes": [
                {"trait_type": "Persona", "value": "Dante"},
                {"trait_type": "Function", "value": "Narrative + Scrolls"},
                {"trait_type": "CodexPhase", "value": "14.2"},
                {"trait_type": "License", "value": "gTek Sovereign Codex v3.0"},
                {"trait_type": "Chain", "value": "Ethereum"}
            ]
        }
    }

    for filename, content in codex_data.items():
        path = os.path.join(output_dir, filename)
        with open(path, "w") as f:
            json.dump(content, f, indent=4)
        print(f"✅ Created: {filename}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="gTek Codex NFT Metadata Generator")
    parser.add_argument("--out", required=True, help="Output directory path")
    args = parser.parse_args()
    start = datetime.utcnow()
    generate_metadata(args.out)
    duration = (datetime.utcnow() - start).total_seconds()
    print(f"🎉 Completed in {duration:.2f}s")
