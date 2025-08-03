#!/bin/bash

# Vault Parameters
MULTISIG_VAULT_PROGRAM="<INSERT_MULTISIG_PROGRAM_ID>"
VAULT_ACTION="authorize_disbursement"
AMOUNT=200000
RECIPIENT="gLUXR_DAO_Treasury"
KEYPAIR_PATH="~/.config/solana/id.json"

# Submit multisig transaction
solana-tx submit \
  --program-id "$MULTISIG_VAULT_PROGRAM" \
  --instruction "$VAULT_ACTION" \
  --args "{\"amount\":$AMOUNT,\"recipient\":\"$RECIPIENT\"}" \
  --keypair "$KEYPAIR_PATH"
