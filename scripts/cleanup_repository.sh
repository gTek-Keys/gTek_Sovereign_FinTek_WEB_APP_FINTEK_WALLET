#!/bin/bash
# Repository Cleanup Script
# Removes common unnecessary files from the repository

echo "🧹 Starting repository cleanup..."

# Remove system files
echo "Removing system files..."
find . -name ".DS_Store" -type f -delete
find . -name "Thumbs.db" -type f -delete
find . -name "ehthumbs.db" -type f -delete

# Remove temporary files
echo "Removing temporary files..."
find . -name "*.tmp" -type f -delete
find . -name "*.bak" -type f -delete
find . -name "*.old" -type f -delete
find . -name "~$*" -type f -delete

# Remove build logs
echo "Removing build logs..."
find . -name "Build*.txt" -type f -delete
find . -name "Log-backup-*.txt" -type f -delete

# Remove empty directories ending with _unzipped
echo "Removing empty unzipped directories..."
find . -type d -name "*_unzipped" -empty -delete

echo "✅ Repository cleanup completed!"
echo "💡 Run 'git status' to see what was removed."