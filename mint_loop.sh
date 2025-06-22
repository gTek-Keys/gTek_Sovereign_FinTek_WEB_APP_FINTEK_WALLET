#!/bin/bash

# ✅ gTek Sovereign Minting Loop
# 1. Deploy + Mint via Remix
# 2. Confirm TX hash
# 3. Platform Broadcast (Manifold etc.)
# 4. Collect TX + CID

# After TX confirmation:
echo "TX_HASH=0xYOUR_ACTUAL_TRANSACTION_HASH" > exec_ledger_env

# 🔄 This triggers the email automated workflow and completes the loop
