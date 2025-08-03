#!/bin/bash

# Set output directory and zip filename
OUTDIR="comprehensive_block_docs"
ZIPFILE="comprehensive_block_bundle.zip"

# Create clean output directory
rm -rf $OUTDIR
mkdir -p $OUTDIR

# Find files containing various Block-related terms
echo "🔍 Comprehensive Block search..."

# Search for multiple patterns
grep -ril -E "(Block|Auditer|Gamification|gTek|CodexGPT|Sovereign)" . | sort | uniq > $OUTDIR/all_matched_files.txt

# Copy files while maintaining structure
while read -r file; do
  # Skip zip files and the output directory itself
  if [[ "$file" != *.zip && "$file" != ./block_docs_collected* && "$file" != ./$OUTDIR* ]]; then
    mkdir -p "$OUTDIR/$(dirname "$file")"
    cp "$file" "$OUTDIR/$file"
  fi
done < $OUTDIR/all_matched_files.txt

# Create zip
zip -r $ZIPFILE $OUTDIR

echo "✅ Comprehensive files archived to: $ZIPFILE"
echo "📁 Found $(cat $OUTDIR/all_matched_files.txt | wc -l) matching files"