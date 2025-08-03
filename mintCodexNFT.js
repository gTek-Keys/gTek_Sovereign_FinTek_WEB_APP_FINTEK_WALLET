import { Alchemy, Wallet, Network } from "alchemy-sdk";
import dotenv from "dotenv";

dotenv.config();

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const wallet = new Wallet(PRIVATE_KEY, alchemy.config.getProvider());

async function mintNFT() {
  try {
    const tx = await wallet.sendTransaction({
      to: wallet.address,
      value: 0,
    });
    console.log("✅ NFT mint simulated:", tx.hash);
  } catch (err) {
    console.error("❌ Mint failed:", err.message);
  }
}

mintNFT();

