// IoT Service for Honey Chain Smart Beekeeping Platform
// Handles sensor telemetry simulations, threshold validation, and device statuses.
// DEMO DATA - Marked clearly for testing.

export const IOT_DISCLAIMER = "DEMO DATA: Simulated IoT sensor telemetry from cellular-enabled hive nodes.";

export const SENSOR_THRESHOLDS = {
  temperature: { min: 32, max: 37, unit: "°C", warningLow: 30, warningHigh: 38 },
  humidity: { min: 45, max: 65, unit: "%", warningLow: 40, warningHigh: 75 },
  weight: { min: 20, max: 60, unit: "kg", warningDropKg: 2.5 }, // > 2.5kg drop in 24h indicates swarming or robbery
  soundFrequency: { min: 180, max: 250, unit: "Hz", stressHz: 280 }, // >280Hz often indicates queenless stress
};

export const generateTelemetryHistory = (hiveId, hours = 24) => {
  const data = [];
  const now = new Date();
  
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600 * 1000);
    const hourLabel = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Simulate slight natural diurnal fluctuations
    const baseTemp = 34.5 + Math.sin(i / 3) * 1.2;
    const baseHumidity = 55 + Math.cos(i / 4) * 4;
    const baseWeight = 42.8 - (i * 0.05); // slight harvest/consumption decay
    const activity = Math.max(10, Math.floor(75 + Math.sin(i / 2) * 20));

    data.push({
      timestamp: hourLabel,
      fullTime: time.toISOString(),
      temperature: Number((baseTemp + (Math.random() * 0.6 - 0.3)).toFixed(1)),
      humidity: Number((baseHumidity + (Math.random() * 2 - 1)).toFixed(1)),
      weight: Number((baseWeight + (Math.random() * 0.2 - 0.1)).toFixed(2)),
      activityScore: activity, // 0-100 scale based on acoustic & movement sensors
      soundFrequency: Math.floor(210 + Math.random() * 30),
      batteryLevel: Math.max(15, Math.floor(95 - (i * 0.1))),
    });
  }
  return data;
};

export const evaluateSensorHealth = (currentReading) => {
  const issues = [];
  
  if (currentReading.temperature > SENSOR_THRESHOLDS.temperature.warningHigh) {
    issues.push({ type: 'TEMP_HIGH', severity: 'WARNING', message: `High temperature: ${currentReading.temperature}°C (Ideal: 32-37°C)` });
  } else if (currentReading.temperature < SENSOR_THRESHOLDS.temperature.warningLow) {
    issues.push({ type: 'TEMP_LOW', severity: 'WARNING', message: `Low brood temperature: ${currentReading.temperature}°C` });
  }

  if (currentReading.humidity > SENSOR_THRESHOLDS.humidity.warningHigh) {
    issues.push({ type: 'HUMIDITY_HIGH', severity: 'WARNING', message: `High humidity: ${currentReading.humidity}% (Fungal risk)` });
  }

  if (currentReading.soundFrequency > SENSOR_THRESHOLDS.soundFrequency.stressHz) {
    issues.push({ type: 'HIGH_FREQUENCY_STRESS', severity: 'CRITICAL', message: `Elevated acoustic frequency (${currentReading.soundFrequency}Hz): Possible Queenless State or Swarming` });
  }

  return {
    isOptimal: issues.length === 0,
    issuesCount: issues.length,
    issues,
  };
};
