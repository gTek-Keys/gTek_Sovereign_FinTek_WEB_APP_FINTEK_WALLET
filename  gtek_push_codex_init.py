import os
from pathlib import Path

base_dir = Path("iTek-Lux-TrustChain-Sovereign-Blockchain")
vault_dir = base_dir / "vault"
docs_dir = base_dir / "docs"

vault_dir.mkdir(parents=True, exist_ok=True)
docs_dir.mkdir(parents=True, exist_ok=True)

files = {
    "README.md": "# Sovereign Codexing — Ritual-Based Invention Infrastructure\n\nCodex is a symbolic invention OS empowering creators to vault, patent, and deploy ideas via ritual UX and blockchain CRID logic...",
    "LICENSE": "# gTek Industries OmniLicense v2.2.2.2\n\n© 2025 gTek Industries, Mighty Mindz Inc., BFH TRUST DESIGNS\n...",
    ".gitignore": "# === gTek Sovereign Git Ignore Protocol v2.3 ===\n\n.env\nsecure.key\n*.pem\n*.key\n*.crt\nnode_modules/\n...",
    "codexshell_config.json": '{ "profile": "JHILL-THM-ARCH", "chain": "polygon", "vault_root": "./vault", "crid": "JHILL-THM-ARCH-CRID-51509329", "tokens": { "currency": "$TOKN", "staking": true } }',
    "codex_deploy.sh": "#!/bin/bash\npython3 codexchat_cli_prototype.py ritual deploy vault_01 \\ \n  --estate=\"Jerome Elston Hill Jr.\" \\ \n  --crid=\"JHILL-THM-ARCH-CRID-51509329\" \\ \n  --chain=polygon \\ \n  --metadata-ipfs=\"bafk...\" \\ \n  --token=$TOKN",
    "vault/ritual_log_01.md": "# Ritual Log 01\nVault deployed using CRID JHILL-THM-ARCH-CRID-51509329",
    "vault/crid_manifest.json": '{ "estate": "Jerome Elston Hill Jr.", "crid": "JHILL-THM-ARCH-CRID-51509329", "deployed": true, "cid": "bafk...", "chain": "polygon" }',
    "docs/symbolic_architecture.md": "# Codex Symbolic Architecture\nDescribes the ritual engine and loop system",
    "docs/theorem_map.svg": '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100"><text x="10" y="50" font-size="20">Codex Theorem Map</text></svg>'
}

for rel_path, content in files.items():
    file_path = base_dir / rel_path
    file_path.parent.mkdir(parents=True, exist_ok=True)
    file_path.write_text(content)