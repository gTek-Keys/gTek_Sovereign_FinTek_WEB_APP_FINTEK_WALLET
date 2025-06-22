// upload.js
import { NFTStorage, File } from 'nft.storage';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.NFT_STORAGE_API_KEY;

async function main() {
  const client = new NFTStorage({ token: API_KEY });

  const dirPath = './assets';
  const files = fs.readdirSync(dirPath).map(fileName => {
    const filePath = path.join(dirPath, fileName);
    return new File([fs.readFileSync(filePath)], fileName);
  });

  if (files.length === 0) {
    console.error('🚫 No files found in assets/. Upload aborted.');
    return;
  }

  console.log('🔄 Uploading files to IPFS via NFT.storage...');
  const cid = await client.storeDirectory(files);
  console.log(`✅ Upload successful. CID: ${cid}`);
}

main().catch(err => {
  console.error('🚨 Upload failed:', err);
});
