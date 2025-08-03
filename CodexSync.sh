#!/bin/bash

echo "🔁 Running CodexSync..."

# Ensure we're in the root of the repo
if [ ! -f ".codexrc" ]; then
  echo "❌ Error: .codexrc not found in current directory."
  exit 1
fi

# Parse relevant values from .codexrc using jq
if ! command -v jq &> /dev/null; then
  echo "⚠️ jq not found. Installing jq is recommended for JSON parsing."
  echo "Install with: brew install jq (on macOS)"
  exit 1
fi

COMMANDER=$(jq -r .commander .codexrc)
PROJECT=$(jq -r .project .codexrc)
DEPLOYED_AT=$(jq -r .deployment_timestamp .codexrc)
HOOKS=$(jq -r '.components.phantom_submodule_cleaner.hooked_into[]' .codexrc)
GITHUB_YML=$(jq -r .components.github_actions.path .codexrc)

echo "🧠 Codex Project: $PROJECT"
echo "👤 Commander: $COMMANDER"
echo "📅 Deployed: $DEPLOYED_AT"

echo ""
echo "🔍 Checking components..."

# Validate presence of core components
MISSING=0

if [ ! -f "scripts/phantom_submodule_cleaner.sh" ]; then
  echo "❌ Missing: scripts/phantom_submodule_cleaner.sh"
  MISSING=1
else
  echo "✅ Cleaner script present"
fi

for hook in $HOOKS; do
  if [ ! -f ".git/hooks/$hook" ]; then
    echo "❌ Missing Git hook: $hook"
    MISSING=1
  else
    echo "✅ Git hook $hook present"
  fi
done

if [ ! -f "$GITHUB_YML" ]; then
  echo "❌ Missing GitHub Actions workflow: $GITHUB_YML"
  MISSING=1
else
  echo "✅ GitHub Actions workflow present"
fi

if [ "$MISSING" -eq 1 ]; then
  echo ""
  echo "⚠️  Some components are missing. Recommend re-running the Codex Full Stack Upgrade."
else
  echo ""
  echo "✅ All Codex components validated and synchronized."
fi
