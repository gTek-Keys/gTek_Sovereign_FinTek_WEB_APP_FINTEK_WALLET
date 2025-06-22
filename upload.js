const { NFTStorage, File } = require('nft.storage');
const fs = require('fs');
const path = require('path');

const API_KEY = '98aa1736.26120f48f3da4cae821c40ddc835d886';
const client = new NFTStorage({ token: API_KEY });

async function main() {
  try {
    const directoryPath = './assets';
    const files = fs.readdirSync(directoryPath).map(file => {
      const content = fs.readFileSync(path.join(directoryPath, file));
      return new File([content], file);
    });

    if (files.length === 0) {
      throw new Error("🚫 Asset directory is empty. Place your media in './assets'.");
    }

    console.log('🔄 Uploading files to IPFS via NFT.storage...');
    const cid = await client.storeDirectory(files);

    console.log(`✅ Upload complete. CID: ${cid}`);
    console.log(`🌐 Access on IPFS: https://ipfs.io/ipfs/${cid}`);
  } catch (error) {
    console.error('🚨 Upload failed:', error.message);
    console.error('📦 Full error:', error);
  }
}

main();
