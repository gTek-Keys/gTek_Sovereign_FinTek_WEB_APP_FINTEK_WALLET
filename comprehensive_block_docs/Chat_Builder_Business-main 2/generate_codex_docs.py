import os
from pathlib import Path
import zipfile

# Directory setup
output_dir = Path("CodexGPT_Docs")
output_dir.mkdir(parents=True, exist_ok=True)

# Document content templates
docs = {
    "gTok_Chat_Designer_Pro_Business_Plan.txt": """gTek gTok Chat Designer Pro Advanced — Business Plan
MISSION: Monetize GPTs via tiers, mint as NFTs, enforce via smart contract.
PHASES: GPT Sales → Codex Nodes → OS & Chip Design.
""",
    "gTok_One_Sheet_Overview.md": """# gTok Chat Designer Pro
GPTs for creators, educators, and systems engineers.
Mintable. Trackable. Sovereign by Design.
""",
    "gTok_OpenSource_License_Summary.txt": """Licenses Used:
- MIT / GPL / Apache (software)
- SIL Open Font License (fonts)
- Creative Commons CC0 / CC-BY (media)
""",
    "README.md": """# CodexGPT Sovereign System
Deploy GPT agents with licensing logic, smart contract triggers, and creative ownership.
""",
    "LICENSE.md": """gTek Industries OmniLicense v2.2.2.2
Attribution + Derivative Disclosure + No AI Model Cloning
"""
}

# Write documents
for name, content in docs.items():
    with open(output_dir / name, "w") as f:
        f.write(content)

# Create ZIP package
zip_name = "CodexGPT_Docs.zip"
with zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for file in output_dir.iterdir():
        zipf.write(file, arcname=file.name)

print("✅ CodexGPT documents created and zipped.")
