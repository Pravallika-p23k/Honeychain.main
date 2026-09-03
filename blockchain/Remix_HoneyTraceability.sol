// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title HoneyTraceability (Remix IDE Ready)
 * @dev Copy of the Honey Chain Smart Contract for interactive learning on Remix IDE (https://remix.ethereum.org).
 */
contract HoneyTraceability {
    address public owner;
    mapping(address => bool) public authorizedAuthorities;

    enum EventType {
        HARVESTED,
        QUALITY_VERIFIED,
        PROCESSED,
        PACKAGED,
        SOLD
    }

    struct TraceabilityEvent {
        EventType eventType;
        string location;
        string notes;
        address signer;
        uint256 timestamp;
    }

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

    mapping(string => Batch) private batches;
    mapping(string => TraceabilityEvent[]) private batchEvents;
    string[] private batchIdsList;

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

    function authorizeAccount(address account) external onlyOwner {
        require(account != address(0), "HoneyTraceability: Invalid address");
        authorizedAuthorities[account] = true;
        emit AuthorityAuthorized(account);
    }

    function registerBatch(
        string calldata _batchId,
        string calldata _hiveId,
        string calldata _beekeeperId,
        string calldata _harvestDate,
        uint256 _quantityKg
    ) external onlyAuthorized {
        require(bytes(_batchId).length > 0, "HoneyTraceability: Batch ID empty");
        require(!batches[_batchId].exists, "HoneyTraceability: Duplicate Batch ID");

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

    function batchExists(string calldata _batchId) external view returns (bool) {
        return batches[_batchId].exists;
    }

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

    function getTraceabilityHistory(string calldata _batchId) external view returns (TraceabilityEvent[] memory) {
        require(batches[_batchId].exists, "HoneyTraceability: Batch ID does not exist");
        return batchEvents[_batchId];
    }
}
