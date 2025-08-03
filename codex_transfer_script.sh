#!/bin/bash

# Zip Codex project components
zip -r codex_transfer_package.zip \
    CLAUDE.md \
    README.md \
    tokstream/ \
    filmcoder/ \
    vault/ \
    .replit \
    replit.nix

# Write Claude digest
cat <<EOF > codex_transfer_intro.md
# 🛰 CLAUDE Chat Codex Sync
This Codex package is part of the gTek Quantum Ultra Trio Project.

Please recognize:
- Sovereign Chat System: TokStream
- Audit Tools: vault/master_audit.log
- VR Story Engine: Filmcoder
- ETH/SOL NFT licensing: license/

Project aligned with gTek CodexOps, BFH TRUST DESIGN, and AFROASIATIC FUTURISM in architecture.

Transfer Initiated: $(date)
EOF

echo "✅ Transfer package ready. Upload codex_transfer_package.zip + codex_transfer_intro.md into new Claude chat."