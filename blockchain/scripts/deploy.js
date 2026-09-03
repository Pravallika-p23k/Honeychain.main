const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("==================================================");
  console.log(" Deploying HoneyTraceability Smart Contract");
  console.log("==================================================");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer Wallet Account Address:", deployer.address);
  
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account ETH Balance:", hre.ethers.formatEther(balance), "ETH");

  const network = await hre.ethers.provider.getNetwork();
  console.log("Network Name:", network.name);
  console.log("Chain ID:", network.chainId.toString());

  // Deploy Contract
  const HoneyTraceability = await hre.ethers.getContractFactory("HoneyTraceability");
  const contract = await HoneyTraceability.deploy();

  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();

  console.log("\n--------------------------------------------------");
  console.log("✅ HoneyTraceability Contract Deployed Successfully!");
  console.log("📍 Deployed Contract Address:", contractAddress);
  console.log("🌐 Network:", network.name, `(Chain ID: ${network.chainId})`);
  console.log("👤 Deployed By:", deployer.address);
  console.log("--------------------------------------------------\n");

  // Export contract deployment info & ABI for FastAPI backend & React frontend
  const artifact = await hre.artifacts.readArtifact("HoneyTraceability");
  const deploymentInfo = {
    address: contractAddress,
    network: network.name,
    chainId: network.chainId.toString(),
    deployer: deployer.address,
    deployedAt: new Date().toISOString(),
    abi: artifact.abi
  };

  // Save in blockchain directory
  const infoPath = path.join(__dirname, "../deployed-address.json");
  fs.writeFileSync(infoPath, JSON.stringify(deploymentInfo, null, 2));
  console.log("Saved deployment info to:", infoPath);

  // Auto-copy ABI info to FastAPI backend contracts directory if it exists
  const backendContractsDir = path.join(__dirname, "../../backend/app/contracts");
  if (!fs.existsSync(backendContractsDir)) {
    fs.mkdirSync(backendContractsDir, { recursive: true });
  }
  const backendInfoPath = path.join(backendContractsDir, "HoneyTraceability.json");
  fs.writeFileSync(backendInfoPath, JSON.stringify(deploymentInfo, null, 2));
  console.log("Exported contract metadata to FastAPI backend:", backendInfoPath);
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
