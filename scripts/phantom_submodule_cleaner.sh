#!/bin/bash
echo "🔍 Scanning for phantom submodules..."

if git config --get submodule.active > /dev/null; then
  echo "🧹 Removing phantom submodule.active entry..."
  git config --unset submodule.active
else
  echo "✅ No phantom submodule.active entry found."
fi

if [ -f ".gitmodules" ]; then
  echo "⚠️  Detected .gitmodules file. Manually inspect or remove if unused."
else
  echo "✅ .gitmodules file not present. Clean state confirmed."
fi

TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
echo "🧠 Submodule audit run at $TIMESTAMP" >> REPOSITORY_AUDIT_REPORT.md
echo "✅ Phantom submodule audit complete."
