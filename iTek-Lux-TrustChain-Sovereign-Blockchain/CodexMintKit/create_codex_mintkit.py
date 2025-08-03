from pathlib import Path

# Create folder
kit_dir = Path("CodexMintKit")
kit_dir.mkdir(exist_ok=True)

# Files to write
files = {
    "codex_nft_metadata.json": """{
  "name": "Sovereign Codexing – Ritual-Based IP Vault",
  "description": "Ritual deployment CLI + symbolic vault system for invention sovereignty. Vault minted via CodexShell + CodexChat.",
  "image": "ipfs://bafybeigw7rbgpjnucyerrrpjmewicjspijmtb6p6mi6slupc53n4a4gkl4",
  "external_url": "https://github.com/gTek-Keys/iTek-Lux-TrustChain-Sovereign-Blockchain",
  "chain": "polygon",
  "wallets": [
    "0x45693ca3b17c2525fd681e932196c8fa50662be9",
    "0x63098c75c24D5CC68AceA933A80bA92926636Db6",
    "0xd613dc29d0eF9589C8a4173acd6c4782424Ce349"
  ],
  "tags": ["codexshell", "cli", "symbolic-ip", "vault-template", "zora", "thirdweb", "manifold"],
  "crid": "JHILL-THM-ARCH-CRID-51509329",
  "estate": "Jerome Elston Hill Jr."
}""",

    "vault_log.md": """# CodexVault Deployment Log

**Vault Name:** Sovereign Codexing – Ritual-Based IP Vault  
**Author:** Jerome Elston Hill Jr.  
**CRID:** JHILL-THM-ARCH-CRID-51509329  
**Chain:** Polygon  
**Wallets:**  
- Zora: 0x45693ca3b17c2525fd681e932196c8fa50662be9  
- Privy: 0x63098c75c24D5CC68AceA933A80bA92926636Db6  
- Manifold: 0xd613dc29d0eF9589C8a4173acd6c4782424Ce349  

**IPFS Metadata CID:** bafybeigw7rbgpjnucyerrrpjmewicjspijmtb6p6mi6slupc53n4a4gkl4  
**GitHub:** https://github.com/gTek-Keys/iTek-Lux-TrustChain-Sovereign-Blockchain
""",

    "manifold_mint_sheet.csv": """name,description,image,external_url
"Sovereign Codexing – Ritual-Based IP Vault","Symbolic vault minted by CodexShell","ipfs://bafybeigw7rbgpjnucyerrrpjmewicjspijmtb6p6mi6slupc53n4a4gkl4","https://github.com/gTek-Keys/iTek-Lux-TrustChain-Sovereign-Blockchain"
""",

    "codex_vault_badge.svg": """<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <rect width="100%" height="100%" fill="#0A0A0A"/>
  <text x="20" y="40" fill="#fff" font-size="16">CodexVault Template</text>
  <text x="20" y="70" fill="#0ff" font-size="14">gTek Industries – CRID: JHILL-THM-ARCH</text>
  <text x="20" y="100" fill="#aaa" font-size="12">Polygon | Zora | Manifold</text>
</svg>"""
}

# Write files
for filename, content in files.items():
    (kit_dir / filename).write_text(content)

print("✅ CodexMintKit created with all 4 vault files.")
