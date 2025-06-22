require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  defaultNetwork: "mainnet",
  networks: {
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
  solidity: "0.8.19",
};
