#!/bin/bash

# Step 1: Ensure Solana config directory exists
mkdir -p ~/.config/solana

# Step 2: Copy the recovered keypair to the Solana default location
cp ./recovered_keys/id.json ~/.config/solana/id.json

# Step 3: Set the Solana CLI config to use this keypair
solana config set --keypair ~/.config/solana/id.json

# Step 4: Confirm configuration
solana config get

