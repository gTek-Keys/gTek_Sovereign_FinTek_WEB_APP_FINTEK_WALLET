#!/bin/bash
echo "🔐 Locking vault..."
bash ./vault_lock.sh

echo "🔁 Redirecting liquidity..."
bash ./redirect_liquidity.sh

echo "🔒 Activating Codex Guard..."
python3 ./codex_guard.py

echo "🧠 Deploying Cidex Defense..."
python3 ./cidex_defense.py

echo "✅ All modules executed successfully."

