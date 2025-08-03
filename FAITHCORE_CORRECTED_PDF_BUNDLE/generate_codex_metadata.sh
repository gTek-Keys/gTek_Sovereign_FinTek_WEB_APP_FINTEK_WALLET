
#!/bin/bash
mkdir -p public/cidex-metadata

# mHi metadata
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

# Claude metadata
cat <<EOF > public/cidex-metadata/Claude_CodexNFT_Metadata.json
{
  "name": "Codex Drop – Claude",
  "description": "Ritual licensing validator for GPT personas. Claude generates IP logic and schema output.",
  "image": "ipfs://CID/ritual_card_claude.png",
  "external_url": "https://gtekglobal.design/codex/claude",
  "attributes": [
    { "trait_type": "Persona", "value": "Claude" },
    { "trait_type": "Function", "value": "IP Logic + Licensing" },
    { "trait_type": "CodexPhase", "value": "14.2" },
    { "trait_type": "License", "value": "gTek Sovereign Codex v3.0" },
    { "trait_type": "Chain", "value": "Ethereum" }
  ]
}
EOF

# Dante metadata
cat <<EOF > public/cidex-metadata/Dante_CodexNFT_Metadata.json
{
  "name": "Codex Drop – Dante",
  "description": "Narrative synthesis architect for GPT CodexShell. Dante weaves poetic audit scrolls.",
  "image": "ipfs://CID/ritual_card_dante.png",
  "external_url": "https://gtekglobal.design/codex/dante",
  "attributes": [
    { "trait_type": "Persona", "value": "Dante" },
    { "trait_type": "Function", "value": "Narrative + Scrolls" },
    { "trait_type": "CodexPhase", "value": "14.2" },
    { "trait_type": "License", "value": "gTek Sovereign Codex v3.0" },
    { "trait_type": "Chain", "value": "Ethereum" }
  ]
}
EOF

echo "✅ Codex NFT metadata files generated in ./public/cidex-metadata/"
