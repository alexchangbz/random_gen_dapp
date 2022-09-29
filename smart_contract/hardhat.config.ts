import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config';

// 0x22711a541E6e4782EBFd9adFB2d486c5b7F464E4

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: process.env.ALCHEMY_API,
      accounts: [process.env.PRIVATE_KEY !== undefined ? process.env.PRIVATE_KEY : '']
    }
  }
};

export default config;
