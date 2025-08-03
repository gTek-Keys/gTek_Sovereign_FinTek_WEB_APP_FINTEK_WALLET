#!/bin/bash

# DAO Proposal Parameters
DAO_PROGRAM_ID="<INSERT_DAO_PROGRAM_ID>"
KEYPAIR_PATH="~/.config/solana/id.json"
TITLE="RWA Capitalization: Real Estate tranche"
DESCRIPTION="Seeking USDC 200K to fund RWA token issuance and liquidity pool seeding."
PROPOSAL_TYPE="RWA"
REQUESTED_AMOUNT=200000

# Submit DAO Proposal
solana-tx submit \
  --program-id "$DAO_PROGRAM_ID" \
  --instruction "create_proposal" \
  --args "{\"title\":\"$TITLE\",\"description\":\"$DESCRIPTION\",\"proposal_type\":\"$PROPOSAL_TYPE\",\"requested_amount\":$REQUESTED_AMOUNT}" \
  --keypair "$KEYPAIR_PATH"
