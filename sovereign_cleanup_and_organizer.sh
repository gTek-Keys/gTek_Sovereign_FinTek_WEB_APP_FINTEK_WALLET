#!/bin/bash
echo "🔧 Starting Sovereign Cleanup and Organizer Script..."

# 1. Delete all empty *_unzipped directories
echo "🧹 Deleting empty *_unzipped folders..."
find ~ -type d -name "*unzipped" -empty -print -delete

# 2. Delete all empty directories
echo "🧹 Deleting all empty directories..."
find ~ -type d -empty -print -delete

# 3. Remove redundant files (.DS_Store, .tmp, backup logs)
echo "🗑 Removing redundant system files..."
find ~ \( -name ".DS_Store" -o -name "*.tmp" -o -name "*.log~" \) -print -delete

# 4. Create SovereignStack folder scaffold
echo "🏗 Creating organizational folder scaffold under ~/SovereignStack..."
mkdir -p ~/SovereignStack/{Archives,Projects,Legal,NFT_Minting,SmartContracts,AI_Assets,Media,Docs,Codex_Audits}

# 5. Optional: Generate software audit report
echo "🧾 Generating software audit report..."
python3 ~/software_audit_tool.py 2>/dev/null || echo "⚠️ Audit script not found. Skipping..."

echo "✅ Sovereign Cleanup and Organization Complete."
