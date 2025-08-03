#!/bin/bash

# Set variables
MINT_ADDRESS="GKWPEPNZyiS7vSgdzFKk76UoJa8XvM9SEA2ysd2DMaie"
METADATA_PROGRAM_ID="metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
CREATOR="3izqrwVEfQpvxPmimpgBfqVVuWGrfJkxuSih6PXuo4zA"
URI="https://ipfs.io/ipfs/QmSjmKW7is3qdpbev4TUyiquJWXahKekyzrSGq4fsxWdoi"
NAME="TrustChain Capsule NFT"
SYMBOL="TCVERI"

echo "⚙️ Creating metadata account using Solana CLI (manual)..."

# Display next steps
echo "📌 NOTE: Solana CLI does not directly expose metadata creation via CLI. You must use Anchor client, Metaplex JSON, or deploy with a custom script."

echo "🔗 Your token is ready and should now be manually associated with metadata."
echo "✅ Mint Address: $MINT_ADDRESS"
echo "🧬 Metadata URI: $URI"
echo "👤 Creator: $CREATOR"
echo "📛 Name: $NAME"
echo "🏷 Symbol: $SYMBOL"

echo ""
echo "🚀 Recommended: Use Solana Anchor/IDL or Rust script for full metadata write to Token Metadata Program"
