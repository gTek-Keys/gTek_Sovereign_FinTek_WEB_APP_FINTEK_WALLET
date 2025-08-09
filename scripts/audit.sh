#!/usr/bin/env bash
set -euo pipefail
echo "== Lint / typecheck =="
if [ -f package.json ]; then
  npm run -s lint || true
  npm run -s typecheck || true
fi
echo "== Tests =="
npm test -- --watch=false || true
echo "== SBOM =="
if command -v syft >/dev/null 2>&1; then
  syft . -o spdx-json=sbom.spdx.json || true
else
  echo "Install syft for SBOM (brew install syft)"
fi
echo "== Vulnerabilities =="
if command -v trivy >/dev/null 2>&1; then
  trivy fs --quiet --severity HIGH,CRITICAL .
else
  echo "Install trivy (brew install trivy) or rely on CI"
fi
echo "== Licenses (node) =="
npx --yes license-checker --summary --production || true
echo "== Git status =="
git fetch --all --prune
git status -sb
