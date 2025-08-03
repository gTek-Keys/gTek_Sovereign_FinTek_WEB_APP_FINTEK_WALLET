#!/bin/bash
echo "🧬 Running CodexReplicator..."

TEMPLATE_DIR="$(pwd)"

# ✅ Update these paths with your actual target repo directories
TARGET_REPOS=(
  "/Users/bfh/Library/CloudStorage/GoogleDrive-collabnonfaablab@gtekglobal.design/My Drive/gTek_Mobile_Command_Center"
  "/Users/bfh/Documents/SovereignCodex_Backup"
)

for repo in "${TARGET_REPOS[@]}"; do
  echo "➡️  Replicating to $repo"

  if [ ! -d "$repo" ]; then
    echo "❌ ERROR: $repo does not exist. Skipping."
    continue
  fi

  mkdir -p "$repo/scripts"
  mkdir -p "$repo/.github/workflows"

  cp "$TEMPLATE_DIR/.codexrc" "$repo/.codexrc" && echo "✅ .codexrc copied"
  cp "$TEMPLATE_DIR/scripts/phantom_submodule_cleaner.sh" "$repo/scripts/" && echo "✅ Cleaner script copied"
  cp "$TEMPLATE_DIR/.github/workflows/codex_audit.yml" "$repo/.github/workflows/" && echo "✅ Workflow copied"
done

echo "✅ Codex replication complete."

