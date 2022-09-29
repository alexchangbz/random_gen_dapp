import { ethers } from "hardhat";

async function main() {
  const Random = await ethers.getContractFactory("Random");
  const random = await Random.deploy();

  await random.deployed();

  console.log(`Smart contract deployed to ${random.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
