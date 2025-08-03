#!/bin/bash
echo "📦 Starting CodexBackup..."

BACKUP_FILE="codex_backup_$(date +%Y%m%d_%H%M%S).tar.gz"
tar -czf "$BACKUP_FILE"   .codexrc   scripts/phantom_submodule_cleaner.sh   .github/workflows/codex_audit.yml   Codex_Stack_Deployment_Certificate.md   REPOSITORY_AUDIT_REPORT.md 2>/dev/null

if [ -f "$BACKUP_FILE" ]; then
  echo "✅ Codex backup created: $BACKUP_FILE"
else
  echo "❌ Backup failed."
fi
