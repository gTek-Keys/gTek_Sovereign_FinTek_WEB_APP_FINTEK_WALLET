#!/bin/bash
# Usage: ./create_with_nano.sh filename.txt

if [ -z "$1" ]; then
  echo "❌ No filename provided. Usage: ./create_with_nano.sh filename.txt"
  exit 1
fi

echo "📝 Opening $1 with nano..."
nano "$1"
