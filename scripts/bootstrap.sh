#!/usr/bin/env bash
set -euo pipefail

echo "== gTek bootstrap =="
# 1) Homebrew + core tools
if ! command -v brew >/dev/null 2>&1; then
  echo ">> Installing Homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  eval "$(/opt/homebrew/bin/brew shellenv)" 2>/dev/null || true
fi

brew update
brew install node@20 jq git pre-commit >/dev/null || true
# optional CLI for SBOM & vuln scan (CI will handle if you skip)
brew install syft trivy >/dev/null || true

# 2) Node deps
if [ -f package.json ]; then
  corepm=npm
  if command -v pnpm >/dev/null 2>&1; then corepm=pnpm
  elif command -v yarn >/dev/null 2>&1; then corepm=yarn
  fi
  echo ">> Installing node deps with $corepm"
  [ "$corepm" = "npm" ] && npm ci || $corepm i
fi

# 3) Git sanity & hooks
git fetch --all --prune
pre-commit install >/dev/null 2>&1 || true

# 4) .env
if [ ! -f .env ]; then
  cp .env.example .env
  echo ">> Created .env (fill in values as needed)"
fi

echo "== Bootstrap done =="
