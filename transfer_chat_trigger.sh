#!/bin/bash

# Set output directory and zip filename
OUTDIR="block_docs_collected"
ZIPFILE="block_codex_bundle.zip"

# Create clean output directory
rm -rf $OUTDIR
mkdir -p $OUTDIR

# Find and copy files containing "The Block"
echo "🔍 Scanning for files containing: 'The Block'"
grep -ril "The Block" . > $OUTDIR/matched_files.txt

while read -r file; do
  # Maintain folder structure
  mkdir -p "$OUTDIR/$(dirname "$file")"
  cp "$file" "$OUTDIR/$file"
done < $OUTDIR/matched_files.txt

# Create zip
zip -r $ZIPFILE $OUTDIR

echo "✅ Files archived to: $ZIPFILE"