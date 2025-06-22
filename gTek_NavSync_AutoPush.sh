#!/bin/bash

# gTek AutoPush Script (Local Directory Execution)

echo "🔍 Staging changes..."
git add .

echo "🧠 Committing changes..."
git commit -m '🧠 Codex Sync: Final Docs & Smart Contract'

echo "🚀 Pushing to GitHub..."
git push origin main

echo "✅ AutoPush Complete."
