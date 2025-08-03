#!/bin/bash

# Sub-mint Parameters
RWA_PROGRAM_ID="<INSERT_RWA_PROGRAM_ID>"
PROPOSAL_ID="<PASTE_APPROVED_PROPOSAL_ID>"
MINT_AMOUNT=50000
RECIPIENT="LP_manager_wallet"
KEYPAIR_PATH="~/.config/solana/id.json"

# Execute sub-mint
solana-tx submit \
  --program-id "$RWA_PROGRAM_ID" \
  --instruction "mint_rwa_tranche" \
  --args "{\"proposal_id\":\"$PROPOSAL_ID\",\"amount\":$MINT_AMOUNT,\"recipient\":\"$RECIPIENT\"}" \
  --keypair "$KEYPAIR_PATH"
