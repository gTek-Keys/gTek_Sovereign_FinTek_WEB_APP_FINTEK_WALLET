#!/bin/bash
echo "🗄️ Launching CodexVault Archive..."

FOLDER="CodexVault_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$FOLDER"

cp .codexrc "$FOLDER/"
cp CodexManifest.md "$FOLDER/"
cp -r scripts "$FOLDER/"
cp -r .github "$FOLDER/"
cp CodexSync.sh "$FOLDER/" 2>/dev/null
cp CodexBackup.sh "$FOLDER/" 2>/dev/null
cp CodexReplicator.sh "$FOLDER/" 2>/dev/null

tar -czf "$FOLDER.tar.gz" "$FOLDER"
rm -rf "$FOLDER"

echo "✅ CodexVault created: $FOLDER.tar.gz"
