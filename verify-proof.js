const hre = require("hardhat");
const snarkjs = require("snarkjs");

async function main() {
  const Verifier = await hre.ethers.getContractFactory("ZKVerifier");
  const verifier = await Verifier.deploy();
  await verifier.waitForDeployment();

  console.log("Verifier deployed to:", await verifier.getAddress());

  // Mock data representing Groth16 Proof points
  const a = [1, 2];
  const b = [[1, 2], [3, 4]];
  const c = [5, 6];
  const input = [1337]; // Public signal

  const tx = await verifier.verifyProof(a, b, c, input);
  const receipt = await tx.wait();

  console.log("Proof verified in transaction:", receipt.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
