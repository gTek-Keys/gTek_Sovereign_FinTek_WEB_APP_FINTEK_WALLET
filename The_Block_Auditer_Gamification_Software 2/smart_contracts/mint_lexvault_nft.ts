
// mint_lexvault_nft.ts
import { createMint, uploadMetadata } from "@helius-labs/sdk";
import fs from "fs";
import path from "path";

const heliusKey = "API_6759c1e2-798a-44b6-b30a-cbd52e8e6246"; // Load from env in production
const filePath = "./LexVault_Starter_Audit_Tool.zip";
const metadataPath = "./metadata.json";

async function mintLexVaultNFT() {
  const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));
  const fileBuffer = fs.readFileSync(filePath);

  const { uri } = await uploadMetadata({
    file: fileBuffer,
    metadata,
    apiKey: heliusKey,
    name: metadata.name,
    type: "application/zip"
  });

  const { mintAddress } = await createMint({
    metadataUri: uri,
    ownerPrivateKey: "<REPLACE_WITH_WALLET_PRIVATE_KEY>",
    apiKey: heliusKey,
  });

  console.log("✅ NFT Minted:", mintAddress);
}

mintLexVaultNFT().catch(console.error);
