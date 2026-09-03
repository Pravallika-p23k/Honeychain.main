// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title HoneyTraceability
 * @dev Government & KVIC Certified Honey Supply Chain Traceability Smart Contract.
 * Manages immutable batch registration and lifecycle event logs.
 */
contract HoneyTraceability {
    // Owner / Government Authority Admin Address
    address public owner;

    // Authorized Authorities (Inspectors, Beekeeper Nodes)
    mapping(address => bool) public authorizedAuthorities;

    // Enum representing the supply chain lifecycle stages
    enum EventType {
        HARVESTED,
        QUALITY_VERIFIED,
        PROCESSED,
        PACKAGED,
        SOLD
    }

    // Struct to store individual supply chain event details
    struct TraceabilityEvent {
        EventType eventType;
        string location;
        string notes;
        address signer;
        uint256 timestamp;
    }

    // Struct to store complete Honey Batch details
    struct Batch {
        string batchId;
        string hiveId;
        string beekeeperId;
        string harvestDate;
        uint256 quantityKg;
        address creator;
        uint256 timestamp;
        bool exists;
    }

    // Storage Mappings
    mapping(string => Batch) private batches;
    mapping(string => TraceabilityEvent[]) private batchEvents;
    string[] private batchIdsList;

    // Solidity Events
    event BatchRegistered(
        string indexed batchId,
        string hiveId,
        string beekeeperId,
        uint256 quantityKg,
        address indexed creator,
        uint256 timestamp
    );

    event TraceabilityEventAdded(
        string indexed batchId,
        EventType eventType,
        string location,
        address indexed signer,
        uint256 timestamp
    );

    event AuthorityAuthorized(address indexed authority);
    event AuthorityRevoked(address indexed authority);

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "HoneyTraceability: Only contract owner allowed");
        _;
    }

    modifier onlyAuthorized() {
        require(
            msg.sender == owner || authorizedAuthorities[msg.sender],
            "HoneyTraceability: Caller is not an authorized authority"
        );
        _;
    }

    constructor() {
        owner = msg.sender;
        authorizedAuthorities[msg.sender] = true;
    }

    /**
     * @dev Grant authority to a government inspector or certified node wallet
     */
    function authorizeAccount(address account) external onlyOwner {
        require(account != address(0), "HoneyTraceability: Invalid address");
        authorizedAuthorities[account] = true;
        emit AuthorityAuthorized(account);
    }

    /**
     * @dev Revoke authority from an account
     */
    function revokeAccount(address account) external onlyOwner {
        require(account != owner, "HoneyTraceability: Cannot revoke owner");
        authorizedAuthorities[account] = false;
        emit AuthorityRevoked(account);
    }

    /**
     * @dev Register a new honey harvest batch on-chain
     */
    function registerBatch(
        string calldata _batchId,
        string calldata _hiveId,
        string calldata _beekeeperId,
        string calldata _harvestDate,
        uint256 _quantityKg
    ) external onlyAuthorized {
        require(bytes(_batchId).length > 0, "HoneyTraceability: Batch ID cannot be empty");
        require(!batches[_batchId].exists, "HoneyTraceability: Duplicate Batch ID already exists");

        batches[_batchId] = Batch({
            batchId: _batchId,
            hiveId: _hiveId,
            beekeeperId: _beekeeperId,
            harvestDate: _harvestDate,
            quantityKg: _quantityKg,
            creator: msg.sender,
            timestamp: block.timestamp,
            exists: true
        });

        batchIdsList.push(_batchId);

        // Auto-add initial HARVESTED event
        batchEvents[_batchId].push(TraceabilityEvent({
            eventType: EventType.HARVESTED,
            location: "Beekeeper Foraging Site",
            notes: "Harvest registered on Honey Chain ledger",
            signer: msg.sender,
            timestamp: block.timestamp
        }));

        emit BatchRegistered(
            _batchId,
            _hiveId,
            _beekeeperId,
            _quantityKg,
            msg.sender,
            block.timestamp
        );
    }

    /**
     * @dev Add a supply chain lifecycle event to an existing batch
     */
    function addTraceabilityEvent(
        string calldata _batchId,
        EventType _eventType,
        string calldata _location,
        string calldata _notes
    ) external onlyAuthorized {
        require(batches[_batchId].exists, "HoneyTraceability: Batch ID does not exist");

        batchEvents[_batchId].push(TraceabilityEvent({
            eventType: _eventType,
            location: _location,
            notes: _notes,
            signer: msg.sender,
            timestamp: block.timestamp
        }));

        emit TraceabilityEventAdded(
            _batchId,
            _eventType,
            _location,
            msg.sender,
            block.timestamp
        );
    }

    /**
     * @dev Check if a batch ID exists on-chain
     */
    function batchExists(string calldata _batchId) external view returns (bool) {
        return batches[_batchId].exists;
    }

    /**
     * @dev Get batch details
     */
    function getBatch(string calldata _batchId) external view returns (
        string memory batchId,
        string memory hiveId,
        string memory beekeeperId,
        string memory harvestDate,
        uint256 quantityKg,
        address creator,
        uint256 timestamp
    ) {
        require(batches[_batchId].exists, "HoneyTraceability: Batch ID does not exist");
        Batch memory b = batches[_batchId];
        return (
            b.batchId,
            b.hiveId,
            b.beekeeperId,
            b.harvestDate,
            b.quantityKg,
            b.creator,
            b.timestamp
        );
    }

    /**
     * @dev Retrieve complete traceability history for a batch
     */
    function getTraceabilityHistory(string calldata _batchId) external view returns (TraceabilityEvent[] memory) {
        require(batches[_batchId].exists, "HoneyTraceability: Batch ID does not exist");
        return batchEvents[_batchId];
    }

    /**
     * @dev Total number of registered batches
     */
    function getTotalBatchesCount() external view returns (uint256) {
        return batchIdsList.length;
    }
}
