// Anchor-based Rust script to create metadata for TrustChain Capsule NFT
use anchor_client::solana_sdk::pubkey::Pubkey;
use anchor_lang::prelude::*;
use mpl_token_metadata::instruction::create_metadata_accounts_v2;
use solana_client::rpc_client::RpcClient;
use solana_sdk::signature::{Keypair, read_keypair_file, Signer};
use solana_sdk::transaction::Transaction;
use std::str::FromStr;

fn main() -> anyhow::Result<()> {
    // Set up environment
    let client = RpcClient::new("https://api.mainnet-beta.solana.com".to_string());
    let payer = read_keypair_file("/Users/bfh/.config/solana/id.json")?;

    // Token mint address
    let mint = Pubkey::from_str("GKWPEPNZyiS7vSgdzFKk76UoJa8XvM9SEA2ysd2DMaie")?;
    let metadata_program_id = Pubkey::from_str("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s")?;
    let metadata_account = Pubkey::find_program_address(
        &[b"metadata", metadata_program_id.as_ref(), mint.as_ref()],
        &metadata_program_id,
    ).0;

    // Metadata values
    let name = "TrustChain Capsule NFT".to_string();
    let symbol = "TCVERI".to_string();
    let uri = "https://ipfs.io/ipfs/QmSjmKW7is3qdpbev4TUyiquJWXahKekyzrSGq4fsxWdoi".to_string();
    let creators = vec![
        mpl_token_metadata::state::Creator {
            address: Pubkey::from_str("3izqrwVEfQpvxPmimpgBfqVVuWGrfJkxuSih6PXuo4zA")?,
            verified: true,
            share: 100,
        },
    ];

    let ix = create_metadata_accounts_v2(
        metadata_program_id,
        metadata_account,
        mint,
        payer.pubkey(),
        payer.pubkey(),
        payer.pubkey(),
        name,
        symbol,
        uri,
        Some(creators),
        0,
        true,
        false,
        None,
        None,
    );

    let recent_blockhash = client.get_latest_blockhash()?;
    let tx = Transaction::new_signed_with_payer(
        &[ix],
        Some(&payer.pubkey()),
        &[&payer],
        recent_blockhash,
    );

    let signature = client.send_and_confirm_transaction(&tx)?;
    println!("✅ Metadata created: {}", signature);

    Ok(())
}

