const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HoneyTraceability Smart Contract Tests", function () {
  let contract;
  let owner;
  let inspector;
  let unauthorizedUser;

  beforeEach(async function () {
    [owner, inspector, unauthorizedUser] = await ethers.getSigners();

    const HoneyTraceability = await ethers.getContractFactory("HoneyTraceability");
    contract = await HoneyTraceability.deploy();
    await contract.waitForDeployment();

    // Authorize inspector account
    await contract.authorizeAccount(inspector.address);
  });

  describe("1. Deployment & Authorization", function () {
    it("Should set the deployer as owner", async function () {
      expect(await contract.owner()).to.equal(owner.address);
    });

    it("Should authorize inspector account", async function () {
      expect(await contract.authorizedAuthorities(inspector.address)).to.equal(true);
    });

    it("Should allow owner to authorize and revoke accounts", async function () {
      await contract.revokeAccount(inspector.address);
      expect(await contract.authorizedAuthorities(inspector.address)).to.equal(false);
    });
  });

  describe("2. Batch Registration", function () {
    it("Should allow authorized account to register a honey batch and emit BatchRegistered event", async function () {
      const batchId = "HC-AP-2026-0001";
      const hiveId = "HC-AP-017";
      const beekeeperId = "RBH-4821";
      const harvestDate = "2026-08-28";
      const quantityKg = 45;

      await expect(
        contract.connect(inspector).registerBatch(batchId, hiveId, beekeeperId, harvestDate, quantityKg)
      )
        .to.emit(contract, "BatchRegistered")
        .withArgs(batchId, hiveId, beekeeperId, quantityKg, inspector.address, (val) => val > 0);

      expect(await contract.batchExists(batchId)).to.equal(true);

      const batch = await contract.getBatch(batchId);
      expect(batch.batchId).to.equal(batchId);
      expect(batch.hiveId).to.equal(hiveId);
      expect(batch.beekeeperId).to.equal(beekeeperId);
      expect(batch.quantityKg).to.equal(BigInt(quantityKg));
      expect(batch.creator).to.equal(inspector.address);
    });

    it("Should REVERT when registering duplicate batch ID", async function () {
      const batchId = "HC-AP-2026-0001";
      await contract.registerBatch(batchId, "HC-AP-017", "RBH-4821", "2026-08-28", 45);

      await expect(
        contract.registerBatch(batchId, "HC-AP-018", "RBH-4821", "2026-08-29", 30)
      ).to.be.revertedWith("HoneyTraceability: Duplicate Batch ID already exists");
    });

    it("Should REVERT when unauthorized user tries to register a batch", async function () {
      await expect(
        contract.connect(unauthorizedUser).registerBatch("HC-AP-2026-9999", "HC-AP-017", "RBH-4821", "2026-08-28", 45)
      ).to.be.revertedWith("HoneyTraceability: Caller is not an authorized authority");
    });
  });

  describe("3. Traceability Events & History Retrieval", function () {
    const batchId = "HC-AP-2026-0001";

    beforeEach(async function () {
      await contract.registerBatch(batchId, "HC-AP-017", "RBH-4821", "2026-08-28", 45);
    });

    it("Should add traceability events and emit TraceabilityEventAdded", async function () {
      await expect(
        contract.connect(inspector).addTraceabilityEvent(
          batchId,
          1, // EventType.QUALITY_VERIFIED
          "KVIC Central NABL Testing Lab",
          "Purity 99.4%, Moisture 17.2%"
        )
      )
        .to.emit(contract, "TraceabilityEventAdded")
        .withArgs(batchId, 1, "KVIC Central NABL Testing Lab", inspector.address, (val) => val > 0);

      const history = await contract.getTraceabilityHistory(batchId);
      expect(history.length).to.equal(2); // Initial HARVESTED + QUALITY_VERIFIED
      expect(history[1].eventType).to.equal(1);
      expect(history[1].location).to.equal("KVIC Central NABL Testing Lab");
      expect(history[1].signer).to.equal(inspector.address);
    });

    it("Should REVERT when adding event to non-existent batch", async function () {
      await expect(
        contract.addTraceabilityEvent("INVALID-BATCH-999", 1, "Lab", "Notes")
      ).to.be.revertedWith("HoneyTraceability: Batch ID does not exist");
    });
  });
});
