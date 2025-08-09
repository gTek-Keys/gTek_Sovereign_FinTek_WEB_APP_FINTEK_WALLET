#!/usr/bin/env bash
set -euo pipefail
# start Vite/Next if available; else static preview of ./public
PM="npm"
if command -v pnpm >/dev/null 2>&1; then PM=pnpm
elif command -v yarn >/dev/null 2>&1; then PM=yarn
fi
if [ -f package.json ] && grep -q '"dev"' package.json; then
  exec $PM run dev -- --host --port 5173
else
  # static fallback
  if ! command -v http-server >/dev/null 2>&1; then
    npm i -g http-server >/dev/null 2>&1
  fi
  exec http-server public -p 8081 -c-1
fi
