require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("⛏️ Deploying with address:", deployer.address);

  const NFT = await hre.ethers.getContractFactory("MakeTheIndustryNFT");
  const nft = await NFT.deploy(deployer.address);
  await nft.deployed();

  console.log("🎬 Contract deployed at:", nft.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
