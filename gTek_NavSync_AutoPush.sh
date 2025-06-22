#!/bin/bash

# === gTek Sovereign Repo Navigator & AutoPush Script v2.0 ===

echo "🧭 Navigating to gTek Sovereign Repo Directory..."

# Update this path as needed for your environment
REPO_PATH="/Users/bfh/gTek Industries Main/gTek_Sovereign_FinTek_WEB_APP_FINTEK_WALLET"

if cd "$REPO_PATH"; then
    echo "✅ Location reached: $REPO_PATH"
else
    echo "❌ Directory not found: $REPO_PATH"
    exit 1
fi

echo "🔍 Staging changes..."
git add .

echo "🧠 Committing with sovereign message..."
git commit -m '🧠 Codex Sync: Filmcode, Docs, Smart Contracts, Metadata'

echo "🚀 Pushing to GitHub..."
git push origin main

echo "✅ gTek NavSync Push Complete."
