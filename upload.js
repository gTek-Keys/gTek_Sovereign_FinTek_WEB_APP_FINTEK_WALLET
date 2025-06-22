// upload.js — NFT.Storage Upload Script (Hardhat Vault Integration)
import { NFTStorage, File } from 'nft.storage'
import * as fs from 'fs'
import * as path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.hardhat' }) // Explicitly point to the correct env file

const client = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY })

async function main() {
  console.log("🔄 Uploading files to IPFS via NFT.storage...")

  const folderPath = './assets'
  const filenames = fs.readdirSync(folderPath)

  if (filenames.length === 0) {
    console.error("🚫 No files in assets/ directory.")
    process.exit(1)
  }

  const files = filenames.map(name => {
    const content = fs.readFileSync(path.join(folderPath, name))
    return new File([content], name)
  })

  try {
    const cid = await client.storeDirectory(files)
    console.log(`✅ Upload Success! CID: ${cid}`)
    console.log(`🌐 IPFS: https://ipfs.io/ipfs/${cid}`)
  } catch (err) {
    console.error("🚨 Upload failed:", err)
  }
}

main()
