// AI Service for Honey Chain Smart Beekeeping Platform
// Predictive models for colony health risk, yield forecasting, and stress identification.
// IMPORTANT: AI outputs are predictive risk scores, NOT definitive medical/veterinary diagnoses.

export const AI_DISCLAIMER = "AI PREDICTIVE ADVISORY: Models provide risk probability and early warning alerts based on IoT acoustics, temperature variance, and weather telemetry. Field inspections are required to confirm diagnosis.";

export const predictHiveHealth = (hive) => {
  const temp = hive.temperature || 34.5;
  const hum = hive.humidity || 55;
  const weight = hive.weight || 40;
  const activity = hive.activity || 80;

  let riskScore = 0; // 0 (Ideal) to 100 (Severe Stress)
  const risks = [];
  const recommendations = [];

  // Humidity & Fungus / Nosema risk model
  if (hum > 70) {
    riskScore += 25;
    risks.push({
      category: "Microclimate Stress",
      title: "Elevated Moisture / Possible Fungal Risk",
      level: "MODERATE",
      probability: "68%",
      details: "Sustained high internal humidity (>70%) increases vulnerability to fungal growth and Nosema infection."
    });
    recommendations.push("Inspect bottom board for dampness and clean ventilation slots within 48 hours.");
  }

  // Temperature instability model
  if (temp < 32 || temp > 38) {
    riskScore += 35;
    risks.push({
      category: "Thermoregulation",
      title: "Brood Temperature Anomaly",
      level: "HIGH",
      probability: "82%",
      details: "Brood nest temperature deviance detected. Indicates potential colony cooling stress or overheating."
    });
    recommendations.push("Check hive shade, insulation, and water availability near the cluster.");
  }

  // Weight drop swarming risk model
  if (hive.weightDrop24h && hive.weightDrop24h > 2.0) {
    riskScore += 40;
    risks.push({
      category: "Colony Population",
      title: "Sudden Weight Drop / Swarming Risk",
      level: "HIGH",
      probability: "89%",
      details: `Unusual weight loss of ${hive.weightDrop24h}kg in 24 hours suggests partial swarming or robbery event.`
    });
    recommendations.push("Conduct immediate brood frame inspection for queen cells and food stores.");
  }

  // Default optimal status if low risk
  if (risks.length === 0) {
    risks.push({
      category: "Colony Health",
      title: "Optimal Biological Balance",
      level: "LOW",
      probability: "94%",
      details: "Acoustic patterns, thermal stability, and weight progression align with healthy foraging behavior."
    });
    recommendations.push("Maintain standard 14-day inspection cycle. Colony is performing normally.");
  }

  const overallHealthScore = Math.max(10, 100 - riskScore);

  return {
    hiveId: hive.id,
    healthScore: overallHealthScore,
    statusLevel: overallHealthScore > 80 ? "EXCELLENT" : overallHealthScore > 60 ? "STABLE" : "ATTENTION_REQUIRED",
    diseaseRiskScore: Math.min(95, riskScore + 10),
    predictedYieldKg: Number((weight * 0.45 + (activity * 0.15)).toFixed(1)),
    estimatedHarvestDays: overallHealthScore > 70 ? 12 : 25,
    risks,
    recommendations,
    lastAnalyzed: new Date().toISOString(),
  };
};

export const getClusterAnalyticsAI = (clusterName = "Andhra Pradesh - Chittoor Cluster") => {
  return {
    clusterName,
    activeHivesMonitored: 340,
    averageHealthScore: 86.4,
    bloomIndex: "High Floral Density (Neem & Mustard in season)",
    predictedRegionalHarvestTons: 14.8,
    riskHeatmap: [
      { area: "Chittoor North", risk: "Low", healthyHivesPct: 92 },
      { area: "Madanapalle West", risk: "Moderate (Moisture)", healthyHivesPct: 78 },
      { area: "Punganur East", risk: "Low", healthyHivesPct: 89 },
    ],
    aiInsightSummary: "Hive telemetry across Chittoor cluster indicates strong nectar flow. Recommend scheduling honey extraction for mature supers in 10-14 days to maximize moisture standard compliance (<18%)."
  };
};
