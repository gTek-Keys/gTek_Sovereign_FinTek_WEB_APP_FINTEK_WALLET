#!/bin/bash
mkdir -p public/cidex-metadata

cat <<EOF > public/cidex-metadata/mHi_CodexNFT_Metadata.json
{
  "name": "Codex Drop – mHi",
  "description": "MetAHueman Intelligence assistant created via GPT CodexShell.",
  "image": "ipfs://CID/ritual_card_mhi.png",
  "external_url": "https://gtekglobal.design/codex/mhi",
  "attributes": [
    { "trait_type": "Persona", "value": "mHi" },
    { "trait_type": "Voice", "value": "Whisper-ElevenLabs" },
    { "trait_type": "CodexPhase", "value": "14.2" },
    { "trait_type": "License", "value": "gTek Sovereign Codex v3.0" },
    { "trait_type": "Chain", "value": "Ethereum" }
  ]
}
EOF

