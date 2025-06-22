#!/bin/bash

echo "🧼 gTek HyperClean Sweep Initiated..."

# 1. Confirm working directory
echo "📍 Current Directory: $(pwd)"

# 2. Remove cached node artifacts
echo "🗑 Cleaning node_modules and lock files..."
rm -rf node_modules package-lock.json

# 3. Ensure env key is quoted properly
echo "🔍 Checking .env.hardhat NFT_STORAGE_API_KEY format..."
sed -i '' 's/^NFT_STORAGE_API_KEY=.*/NFT_STORAGE_API_KEY="98aa1736.26120f48f3da4cae821c40ddc835d886"/' .env.hardhat

# 4. Ensure ES module type is declared
echo "🧠 Ensuring ES module syntax in package.json..."
jq '. + {"type": "module"}' package.json > temp.package.json && mv temp.package.json package.json

# 5. Reinstall node modules with legacy peer deps
echo "📦 Reinstalling packages..."
npm install --legacy-peer-deps

# 6. Validate API key loading
echo "🔑 Verifying NFT_STORAGE_API_KEY load..."
node -e "import('dotenv').then(d => { d.config({ path: '.env.hardhat' }); console.log('✅ Loaded Key:', process.env.NFT_STORAGE_API_KEY); })"

echo "✅ Sweep Complete. Run 'node upload.js' to deploy."
