import React, { createContext, useContext, useEffect, useState } from "react";
import { generateTelemetryHistory } from "../services/iotService";
import {
  INITIAL_BLOCKCHAIN_RECORDS,
  createMockTransaction,
} from "../services/blockchainService";

const DataContext = createContext();
const BLOCKCHAIN_STORAGE_KEY = "honeychain-blockchain-logs";

const INITIAL_HIVES = [
  {
    id: "HC-AP-017",
    qrId: "QR-HC-AP-017-984",
    location: "Madanapalle - Plot 3 (Chittoor AP)",
    colonyStatus: "HEALTHY",
    healthScore: 92,
    temperature: 34.8,
    humidity: 54,
    weight: 48.2,
    activity: 88,
    battery: 94,
    beeSpecies: "Apis cerana indica (Indian Honey Bee)",
    queenInfo: "Queen #Q-2025-AP09 (Age: 1.2 yrs, Marked Yellow)",
    lastInspection: "2026-08-27",
    installationDate: "2025-02-14",
    weightDrop24h: 0.1,
    telemetry: generateTelemetryHistory("HC-AP-017", 24),
    inspections: [
      {
        date: "2026-08-27",
        inspector: "Ramesh Kumar",
        notes:
          "Strong brood pattern. 6 frames capped honey. No mites observed.",
        condition: "Excellent",
      },
      {
        date: "2026-08-12",
        inspector: "Ramesh Kumar",
        notes: "Routine check. Added super frame.",
        condition: "Good",
      },
    ],
  },
  {
    id: "HC-AP-018",
    qrId: "QR-HC-AP-018-985",
    location: "Madanapalle - Plot 3 (Chittoor AP)",
    colonyStatus: "ATTENTION_REQUIRED",
    healthScore: 68,
    temperature: 38.2, // Temp high alert!
    humidity: 72, // Humidity high alert!
    weight: 39.5,
    activity: 62,
    battery: 78,
    beeSpecies: "Apis mellifera (European Honey Bee)",
    queenInfo: "Queen #Q-2024-EU01 (Age: 2.1 yrs, Marked Red)",
    lastInspection: "2026-08-20",
    installationDate: "2024-11-05",
    weightDrop24h: 0.4,
    telemetry: generateTelemetryHistory("HC-AP-018", 24),
    inspections: [
      {
        date: "2026-08-20",
        inspector: "Ramesh Kumar",
        notes: "Internal temperature elevated. Shade net recommended.",
        condition: "Fair",
      },
    ],
  },
  {
    id: "HC-AP-019",
    qrId: "QR-HC-AP-019-986",
    location: "Punganur Sector 1 (Chittoor AP)",
    colonyStatus: "HEALTHY",
    healthScore: 95,
    temperature: 34.2,
    humidity: 52,
    weight: 52.0,
    activity: 94,
    battery: 98,
    beeSpecies: "Apis cerana indica",
    queenInfo: "Queen #Q-2025-AP12 (Age: 0.8 yrs, Marked Green)",
    lastInspection: "2026-08-29",
    installationDate: "2025-05-10",
    weightDrop24h: 0.0,
    telemetry: generateTelemetryHistory("HC-AP-019", 24),
    inspections: [
      {
        date: "2026-08-29",
        inspector: "Ramesh Kumar",
        notes: "High nectar flow. Super frame 85% full.",
        condition: "Excellent",
      },
    ],
  },
  {
    id: "HC-AP-020",
    qrId: "QR-HC-AP-020-987",
    location: "Punganur Sector 1 (Chittoor AP)",
    colonyStatus: "SWARMING_RISK",
    healthScore: 58,
    temperature: 35.1,
    humidity: 58,
    weight: 34.1,
    activity: 45,
    battery: 62,
    beeSpecies: "Apis mellifera",
    queenInfo: "Queen #Q-2024-EU88 (Age: 2.4 yrs)",
    lastInspection: "2026-08-15",
    installationDate: "2024-09-18",
    weightDrop24h: 3.1, // Swarming weight drop!
    telemetry: generateTelemetryHistory("HC-AP-020", 24),
    inspections: [
      {
        date: "2026-08-15",
        inspector: "Ramesh Kumar",
        notes: "Queen cells built. High swarming tendency.",
        condition: "Requires Action",
      },
    ],
  },
  {
    id: "HC-UP-001",
    qrId: "QR-HC-UP-001-301",
    location: "Lucknow Eucalyptus Grove (UP)",
    colonyStatus: "HEALTHY",
    healthScore: 91,
    temperature: 34.6,
    humidity: 50,
    weight: 58.4,
    activity: 90,
    battery: 89,
    beeSpecies: "Apis mellifera",
    queenInfo: "Queen #Q-2025-UP01 (Age: 1.0 yrs)",
    lastInspection: "2026-08-26",
    installationDate: "2025-01-20",
    weightDrop24h: 0.2,
    telemetry: generateTelemetryHistory("HC-UP-001", 24),
    inspections: [],
  },
  {
    id: "HC-KA-104",
    qrId: "QR-HC-KA-104-512",
    location: "Coorg Coffee Estate (Karnataka)",
    colonyStatus: "HEALTHY",
    healthScore: 96,
    temperature: 33.9,
    humidity: 61,
    weight: 62.1,
    activity: 96,
    battery: 92,
    beeSpecies: "Apis cerana indica",
    queenInfo: "Queen #Q-2025-KA44 (Age: 0.6 yrs)",
    lastInspection: "2026-08-28",
    installationDate: "2025-03-01",
    weightDrop24h: 0.0,
    telemetry: generateTelemetryHistory("HC-KA-104", 24),
    inspections: [],
  },
];

const INITIAL_BATCHES = [
  {
    batchId: "HC-AP-2026-0001",
    sourceHives: ["HC-AP-017", "HC-AP-019"],
    beekeeperId: "RBH-4821",
    beekeeperName: "Ramesh Kumar",
    cluster: "Andhra Pradesh - Chittoor Cluster",
    harvestDate: "2026-08-28",
    quantityKg: 45.0,
    floralSource: "Wildflower & Mustard",
    location: "Madanapalle, Chittoor, AP",
    collector: "Ramesh Kumar",
    notes: "First monsoon harvest. Clear amber color with floral aroma.",
    qualityStatus: "PASSED_KVIC_TEST", // PENDING, IN_TESTING, PASSED_KVIC_TEST, REJECTED
    processingStatus: "PACKAGED", // HARVESTED, PROCESSING, PACKAGED, FOR_SALE
    blockchainStatus: "CONFIRMED_ON_CHAIN",
    purityScore: "99.4%",
    moistureContent: "17.2%",
    hmfPpm: "12 mg/kg",
    c4SugarTest: "Passed (<7% negative)",
    qrCodeUrl:
      "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=HC-AP-2026-0001",
    pricePerKg: 650,
    isListedOnMarketplace: true,
  },
  {
    batchId: "HC-UP-2026-0084",
    sourceHives: ["HC-UP-001"],
    beekeeperId: "RBH-1102",
    beekeeperName: "Sunita Devi",
    cluster: "Uttar Pradesh - Lucknow Cluster",
    harvestDate: "2026-08-25",
    quantityKg: 120.0,
    floralSource: "Eucalyptus Bloom",
    location: "Lucknow District, UP",
    collector: "Sunita Devi",
    notes: "Mono-floral Eucalyptus extraction with rich medicinal notes.",
    qualityStatus: "PASSED_KVIC_TEST",
    processingStatus: "FOR_SALE",
    blockchainStatus: "CONFIRMED_ON_CHAIN",
    purityScore: "98.9%",
    moistureContent: "16.8%",
    hmfPpm: "14 mg/kg",
    c4SugarTest: "Passed",
    qrCodeUrl:
      "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=HC-UP-2026-0084",
    pricePerKg: 720,
    isListedOnMarketplace: true,
  },
  {
    batchId: "HC-AP-2026-0002",
    sourceHives: ["HC-AP-018"],
    beekeeperId: "RBH-4821",
    beekeeperName: "Ramesh Kumar",
    cluster: "Andhra Pradesh - Chittoor Cluster",
    harvestDate: "2026-08-31",
    quantityKg: 22.5,
    floralSource: "Neem Blossom",
    location: "Madanapalle, Chittoor, AP",
    collector: "Ramesh Kumar",
    notes: "Fresh raw harvest submitted for lab testing.",
    qualityStatus: "IN_TESTING",
    processingStatus: "PROCESSING",
    blockchainStatus: "CONFIRMED_ON_CHAIN",
    purityScore: "Testing Pending",
    moistureContent: "Pending Lab",
    hmfPpm: "Pending",
    c4SugarTest: "In Progress",
    qrCodeUrl:
      "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=HC-AP-2026-0002",
    pricePerKg: 580,
    isListedOnMarketplace: false,
  },
];

const INITIAL_ALERTS = [
  {
    id: "ALT-2026-101",
    hiveId: "HC-AP-018",
    title: "High Temperature & Humidity Alert",
    type: "TEMP_HUMIDITY_HIGH",
    severity: "WARNING",
    message:
      "Hive HC-AP-018 registered 38.2°C and 72% humidity. Microclimate heat stress risk.",
    timestamp: "2026-09-01 08:15:00",
    read: false,
  },
  {
    id: "ALT-2026-102",
    hiveId: "HC-AP-020",
    title: "Sudden Weight Drop - Possible Swarming",
    type: "SWARMING_WEIGHT_DROP",
    severity: "CRITICAL",
    message:
      "Hive HC-AP-020 dropped 3.1kg in weight over 24h. Possible queen swarming event.",
    timestamp: "2026-08-31 16:40:00",
    read: false,
  },
  {
    id: "ALT-2026-103",
    batchId: "HC-AP-2026-0002",
    title: "Lab Testing Pending Verification",
    type: "QUALITY_AUDIT",
    severity: "INFO",
    message:
      "Harvest Batch HC-AP-2026-0002 submitted to KVIC testing lab for Purity & C4 sugar test.",
    timestamp: "2026-08-31 10:00:00",
    read: true,
  },
];

export const DataProvider = ({ children }) => {
  const [hives, setHives] = useState(INITIAL_HIVES);
  const [batches, setBatches] = useState(INITIAL_BATCHES);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [blockchainLogs, setBlockchainLogs] = useState(() => {
    const savedLogs = localStorage.getItem(BLOCKCHAIN_STORAGE_KEY);

    if (!savedLogs) {
      return INITIAL_BLOCKCHAIN_RECORDS;
    }

    try {
      return JSON.parse(savedLogs);
    } catch {
      return INITIAL_BLOCKCHAIN_RECORDS;
    }
  });

  useEffect(() => {
    localStorage.setItem(
      BLOCKCHAIN_STORAGE_KEY,
      JSON.stringify(blockchainLogs),
    );
  }, [blockchainLogs]);

  // Add new Hive
  const addHive = (newHiveData) => {
    const id = `HC-AP-0${hives.length + 21}`;
    const newHive = {
      id,
      qrId: `QR-${id}-100`,
      location: newHiveData.location || "Chittoor Sector 2 (AP)",
      colonyStatus: "HEALTHY",
      healthScore: 90,
      temperature: 34.5,
      humidity: 55,
      weight: Number(newHiveData.initialWeight || 35.0),
      activity: 85,
      battery: 100,
      beeSpecies: newHiveData.beeSpecies || "Apis cerana indica",
      queenInfo: newHiveData.queenInfo || "Queen #Q-2026-NEW",
      lastInspection: new Date().toISOString().split("T")[0],
      installationDate: new Date().toISOString().split("T")[0],
      telemetry: generateTelemetryHistory(id, 24),
      inspections: [],
    };
    setHives([newHive, ...hives]);
    return newHive;
  };

  // Add new Harvest (creates batch & blockchain log)
  const addHarvest = (harvestForm) => {
    const seq = (batches.length + 1).toString().padStart(4, "0");
    const batchId = `HC-AP-2026-${seq}`;

    const newBatch = {
      batchId,
      sourceHives: Array.isArray(harvestForm.hiveId)
        ? harvestForm.hiveId
        : [harvestForm.hiveId],
      beekeeperId: "RBH-4821",
      beekeeperName: harvestForm.collector || "Ramesh Kumar",
      cluster: "Andhra Pradesh - Chittoor Cluster",
      harvestDate:
        harvestForm.harvestDate || new Date().toISOString().split("T")[0],
      quantityKg: Number(harvestForm.quantityKg),
      floralSource: harvestForm.floralSource,
      location: harvestForm.location || "Madanapalle, Chittoor, AP",
      collector: harvestForm.collector || "Ramesh Kumar",
      notes: harvestForm.notes || "Harvest recorded via Honey Chain Portal",
      qualityStatus: "IN_TESTING",
      processingStatus: "HARVESTED",
      blockchainStatus: "CONFIRMED_ON_CHAIN",
      purityScore: "In Testing",
      moistureContent: "In Testing",
      hmfPpm: "Pending",
      c4SugarTest: "Pending",
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${batchId}`,
      pricePerKg: Number(harvestForm.estimatedPrice || 600),
      isListedOnMarketplace: false,
    };

    setBatches([newBatch, ...batches]);

    // Create corresponding blockchain transaction
    const tx = createMockTransaction(
      "BATCH_HARVEST_LOGGED",
      batchId,
      `Beekeeper #${harvestForm.collector || "Ramesh Kumar"}`,
      {
        harvestWeightKg: Number(harvestForm.quantityKg),
        floralSource: harvestForm.floralSource,
        sourceHives: newBatch.sourceHives,
      },
    );
    setBlockchainLogs((prevLogs) => [tx, ...prevLogs]);

    return batchId;
  };

  // Update Batch Status (e.g. Gov Officer approves lab test)
  const updateBatchQuality = (batchId, qualityStatus, labResults = {}) => {
    setBatches((prev) =>
      prev.map((b) => {
        if (b.batchId === batchId) {
          return {
            ...b,
            qualityStatus,
            purityScore: labResults.purityScore || "99.2%",
            moistureContent: labResults.moistureContent || "17.4%",
            hmfPpm: labResults.hmfPpm || "10 mg/kg",
            c4SugarTest: labResults.c4SugarTest || "Passed Negative",
            processingStatus:
              qualityStatus === "PASSED_KVIC_TEST"
                ? "PACKAGED"
                : b.processingStatus,
          };
        }
        return b;
      }),
    );

    // Add blockchain verification event
    const tx = createMockTransaction(
      qualityStatus === "PASSED_KVIC_TEST"
        ? "QUALITY_VERIFICATION_PASSED"
        : "QUALITY_VERIFICATION_FAILED",
      batchId,
      "KVIC Quality Inspector #GOV-904",
      labResults,
    );
    setBlockchainLogs((prevLogs) => [tx, ...prevLogs]);
  };

  // Toggle Marketplace Listing
  const toggleMarketplaceListing = (batchId, price) => {
    setBatches((prev) =>
      prev.map((b) => {
        if (b.batchId === batchId) {
          return {
            ...b,
            isListedOnMarketplace: !b.isListedOnMarketplace,
            pricePerKg: price || b.pricePerKg,
          };
        }
        return b;
      }),
    );
  };

  // Dismiss Alert
  const dismissAlert = (alertId) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
  };

  return (
    <DataContext.Provider
      value={{
        hives,
        batches,
        alerts,
        blockchainLogs,
        addHive,
        addHarvest,
        updateBatchQuality,
        toggleMarketplaceListing,
        dismissAlert,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
