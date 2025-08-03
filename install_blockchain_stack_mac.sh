#!/bin/bash

echo "🔧 Starting installation of Solana CLI, SPL Token CLI, and Metaplex CLI..."

# Update Homebrew
brew update

# Install Solana CLI
brew install solana

# Verify Solana install
solana --version

# Install Rust (if not installed)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Source environment changes
source $HOME/.cargo/env

# Install SPL Token CLI
cargo install spl-token-cli

# Install Node.js (if needed for Metaplex)
brew install node

# Install Metaplex CLI
npm install -g @metaplex/cli

# Verify installs
spl-token --version
metaplex --version

echo "✅ Installation complete. Solana, SPL Token CLI, and Metaplex are ready to use."
