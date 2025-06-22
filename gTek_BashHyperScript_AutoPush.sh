#!/bin/bash
# 🧠 gTek BashHyperScript — Auto Git Push Loop (Every 10 minutes)
# Project: Make The Industry (The Block — S1E1)
# Author: Commander Tok | Sovereign Systems

REPO_DIR="/Users/gTek Industries Main/gTek_Sovereign_FinTek_WEB_APP_FINTEK_WALLET"
COMMIT_MESSAGE="🔁 Auto-sync: Make The Industry Sovereign Filmcode Update"

cd "$REPO_DIR" || { echo "❌ Repo path invalid: $REPO_DIR"; exit 1; }

while true; do
    echo "🌀 [$(date)] Checking and pushing new commits..."

    git add .
    git commit -m "$COMMIT_MESSAGE"
    git push origin main

    echo "✅ Sync complete. Waiting 10 minutes..."
    sleep 600
done
