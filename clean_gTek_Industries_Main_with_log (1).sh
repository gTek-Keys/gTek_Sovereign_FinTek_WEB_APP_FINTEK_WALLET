#!/bin/bash
# clean_gTek_Industries_Main_with_log.sh
# Deletes all empty *_unzipped and *.unzipped folders under ~/gTek Industries Main and logs results

TARGET_DIR="$HOME/gTek Industries Main"
LOG_FILE="$HOME/Desktop/unzipped_cleanup.log"

echo "🧹 Cleaning started: $(date)" > "$LOG_FILE"

find "$TARGET_DIR" -type d \( -name "*_unzipped" -o -name "*.unzipped" \) -empty -print -exec rm -rv {} \; >> "$LOG_FILE"

echo "✅ Cleaning completed: $(date)" >> "$LOG_FILE"
