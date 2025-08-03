#!/bin/bash
echo "🚀 Running CodexInstaller..."

mkdir -p scripts
mkdir -p .github/workflows

cp CodexSync.sh .
cp CodexBackup.sh .
cp CodexReplicator.sh .
cp CodexManifest.md .
cp .codexrc .
cp scripts/phantom_submodule_cleaner.sh scripts/
cp .github/workflows/codex_audit.yml .github/workflows/

echo "✅ Codex Installer has restored the full stack."
