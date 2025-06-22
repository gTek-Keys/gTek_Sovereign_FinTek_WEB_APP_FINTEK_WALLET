const { ethers } = require("hardhat");

async function main() {
  const hashes = [
    "0xc4f15428c7539370184b348b916b66d6813f62f281d2ed09fd7b1f8139a92c98",
    "0x4f175f18f01874e2200413bf0a1b044a6413823a90261abc2742919e68935a57",
    "0x76b6749473cf763609317cbbe6b4fa76c459373f4e75ce8cc010e2ff736d1ec8",
    "0xbc3f92f543cc505c99554b99e020df78889302118e860d06840fdbd368338ef8"
  ];

  for (const txHash of [...new Set(hashes)]) {
    const receipt = await ethers.provider.getTransactionReceipt(txHash);
    console.log("🧾 TX:", txHash, {
      status: receipt.status === 1 ? "✅ Success" : "❌ Failed",
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed.toString(),
      contractAddress: receipt.contractAddress || "—",
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
