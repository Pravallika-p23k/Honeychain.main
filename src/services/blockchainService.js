// Blockchain Ledger Service Abstraction for Honey Chain
// Manages transparent audit trails and mock transactions.
// IMPORTANT: Demonstrative local state. Backend network integration will be connected in production.

export const BLOCKCHAIN_DISCLAIMER = "BLOCKCHAIN DEMO LEDGER: Smart contract integration points prepared for Ethereum / Hyperledger Fabric backend. Current records are locally signed proof-of-concept receipts.";

export const INITIAL_BLOCKCHAIN_RECORDS = [
  {
    txHash: "0x8f7a9d3e1b4c6a2f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1",
    batchId: "HC-AP-2026-0001",
    event: "BATCH_HARVEST_LOGGED",
    timestamp: "2026-08-28 09:30:14",
    blockNumber: 18492041,
    signer: "Beekeeper #RBH-4821 (Ramesh Kumar)",
    location: "Chittoor Cluster, AP",
    status: "CONFIRMED",
    gasUsed: "21,040 Gwei",
    network: "HoneyChain Testnet (Hyperledger Besu)",
    metadata: {
      harvestWeightKg: 45.0,
      floralSource: "Wildflower & Mustard",
      sourceHives: ["HC-AP-017", "HC-AP-018", "HC-AP-019"]
    }
  },
  {
    txHash: "0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4",
    batchId: "HC-AP-2026-0001",
    event: "QUALITY_VERIFICATION_PASSED",
    timestamp: "2026-08-30 14:15:22",
    blockNumber: 18493180,
    signer: "KVIC Lab Auditor #GOV-904 (Dr. A. Sharma)",
    location: "KVIC Central Testing Lab, Vijayawada",
    status: "CONFIRMED",
    gasUsed: "18,400 Gwei",
    network: "HoneyChain Testnet (Hyperledger Besu)",
    metadata: {
      purityScore: "99.4%",
      moistureContent: "17.2%",
      hmfPpm: "12 mg/kg",
      c4Sugars: "Negative (<7%)"
    }
  },
  {
    txHash: "0x9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8",
    batchId: "HC-UP-2026-0084",
    event: "BATCH_HARVEST_LOGGED",
    timestamp: "2026-08-25 11:10:00",
    blockNumber: 18489110,
    signer: "Beekeeper #RBH-1102 (Sunita Devi)",
    location: "Lucknow Cluster, UP",
    status: "CONFIRMED",
    gasUsed: "21,040 Gwei",
    network: "HoneyChain Testnet (Hyperledger Besu)",
    metadata: {
      harvestWeightKg: 120.0,
      floralSource: "Eucalyptus Bloom",
      sourceHives: ["HC-UP-001", "HC-UP-002"]
    }
  },
  {
    txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    batchId: "HC-UP-2026-0084",
    event: "DIGITAL_SEAL_AUTHORIZED",
    timestamp: "2026-08-27 16:45:00",
    blockNumber: 18490200,
    signer: "KVIC Officer #KVIC-DL-02 (Rajesh Varma)",
    location: "NABL Certified Lab, Delhi",
    status: "CONFIRMED",
    gasUsed: "24,500 Gwei",
    network: "HoneyChain Testnet (Hyperledger Besu)",
    metadata: {
      sealId: "KVIC-SEAL-2026-994",
      grade: "Grade A Premium Organic"
    }
  }
];

export const createMockTransaction = (event, batchId, signer, metadata = {}) => {
  const randomHex = () => Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  
  return {
    txHash: `0x${randomHex()}`,
    batchId,
    event,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    blockNumber: 18495000 + Math.floor(Math.random() * 500),
    signer,
    location: "Digital Node Signature",
    status: "CONFIRMED",
    gasUsed: "21,200 Gwei",
    network: "HoneyChain Testnet (Hyperledger Besu)",
    metadata
  };
};
