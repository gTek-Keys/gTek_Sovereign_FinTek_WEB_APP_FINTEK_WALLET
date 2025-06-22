// upload.js — CommonJS-Compatible NFT Upload Script
const { NFTStorage, File } = require('nft.storage');
const fs = require('fs');
const path = require('path');

const NFT_STORAGE_KEY = '98aa173626120f48f3da4cae821c40ddc835d886';

const assetsDir = path.join(__dirname, 'assets');

async function main() {
  console.log('🔄 Uploading files to IPFS via NFT.storage...');

  try {
    const files = fs.readdirSync(assetsDir).map(fileName => {
      const filePath = path.join(assetsDir, fileName);
      const content = fs.readFileSync(filePath);
      return new File([content], fileName, { type: 'application/octet-stream' });
    });

    const client = new NFTStorage({ token: NFT_STORAGE_KEY });
    const cid = await client.storeDirectory(files);

    console.log('✅ Upload successful!');
    console.log(`📦 IPFS CID: ${cid}`);
    console.log(`🔗 Gateway URL: https://ipfs.io/ipfs/${cid}`);
  } catch (error) {
    console.error('🚨 Upload failed:', error);
  }
}

main();
