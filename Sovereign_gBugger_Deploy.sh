#!/bin/bash

# === Clean ZSH Configuration ===
echo "🔧 Cleaning ~/.zshrc..."
sed -i.bak '/import\|from\|base_path\|zip_paths\|os\.path/d' ~/.zshrc
source ~/.zshrc
echo "✅ .zshrc cleaned and reloaded."

# === Setup Git Repository ===
echo "📂 Navigating to project directory..."
cd "$HOME/Ieee Dropbox/Jerome Hill/Mac/Documents/GitHub/gBugger/gBugger" || { echo "❌ Directory not found."; exit 1; }

# === Place Script (requires manual download to Downloads) ===
if [ -f "$HOME/Downloads/gTek_PythonPush_MultiScript.py" ]; then
    mv "$HOME/Downloads/gTek_PythonPush_MultiScript.py" ./
    echo "✅ Sovereign Script placed."
else
    echo "⚠️ Script not found in Downloads. Please download it first."
    exit 1
fi

# === Git Operations ===
echo "🚀 Running Git Commands..."
git init
git add .
git commit -m '🚀 Initial Sovereign MetAHueman deployment'
git branch -M main
git remote remove origin 2>/dev/null
git remote add origin https://github.com/HomeMadeResearchLab/gBugger.git
git push -u origin main

echo "✅ Push complete. Sovereign sync established."
