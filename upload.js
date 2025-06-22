const { NFTStorage, File } = require('nft.storage');
const fs = require('fs');
const path = require('path');

const NFT_STORAGE_API_KEY = '98aa1736.26120f48f3da4cae821c40ddc835d886';
const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });

async function main() {
  const assetDir = './assets';
  const files = fs.readdirSync(assetDir).map(fileName => {
    const content = fs.readFileSync(path.join(assetDir, fileName));
    return new File([content], fileName);
  });

  const cid = await client.storeDirectory(files);
  console.log('✅ All assets uploaded. IPFS CID:', cid);
}

main();
