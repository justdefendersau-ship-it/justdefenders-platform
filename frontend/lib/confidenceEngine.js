/**
 * ============================================================
 * JustDefenders © Confidence Engine
 * File: C:\dev\justdefenders\frontend\lib\confidenceEngine.js
 * Timestamp: 02 April 2026 23:00 (Sydney)
 *
 * PURPOSE:
 * Provide confidence scoring + explanation layer
 *
 * ============================================================
 */

/**
 * ------------------------------------------------------------
 * WEIGHT CONFIGURATION
 * ------------------------------------------------------------
 */

const WEIGHTS = {
  telemetry: 0.25,
  diagnosis: 0.25,
  repair: 0.2,
  parts: 0.2,
  alerts: 0.1
};

/**
 * ------------------------------------------------------------
 * NORMALISE INPUT (0–1 RANGE)
 * ------------------------------------------------------------
 */

function clamp(value) {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

/**
 * ------------------------------------------------------------
 * SCORE CALCULATION
 * ------------------------------------------------------------
 */

function calculateScore(inputs) {
  return (
    clamp(inputs.telemetry) * WEIGHTS.telemetry +
    clamp(inputs.diagnosis) * WEIGHTS.diagnosis +
    clamp(inputs.repair) * WEIGHTS.repair +
    clamp(inputs.parts) * WEIGHTS.parts +
    clamp(inputs.alerts) * WEIGHTS.alerts
  );
}

/**
 * ------------------------------------------------------------
 * LEVEL MAPPING
 * ------------------------------------------------------------
 */

function getLevel(score) {
  if (score >= 0.9) return "high";
  if (score >= 0.7) return "likely";
  if (score >= 0.5) return "possible";
  return "low";
}

/**
 * ------------------------------------------------------------
 * EXPLANATION ENGINE
 * ------------------------------------------------------------
 */

function buildExplanation(inputs) {
  const reasons = [];

  if (inputs.telemetry > 0.7) {
    reasons.push("Telemetry strongly indicates fault pattern");
  }

  if (inputs.diagnosis > 0.7) {
    reasons.push("Diagnosis matches known failure case");
  }

  if (inputs.repair > 0.6) {
    reasons.push("Repair path is well established");
  }

  if (inputs.parts > 0.6) {
    reasons.push("Parts availability supports repair");
  }

  if (inputs.alerts > 0.5) {
    reasons.push("Supporting alerts detected");
  }

  if (reasons.length === 0) {
    reasons.push("Limited supporting data available");
  }

  return reasons;
}

/**
 * ------------------------------------------------------------
 * PUBLIC ENGINE
 * ------------------------------------------------------------
 */

export function getConfidence(inputs) {
  const score = calculateScore(inputs);
  const level = getLevel(score);
  const explanation = buildExplanation(inputs);

  return {
    score: Number(score.toFixed(2)),
    level,
    explanation,
    metadata: {
      source: "confidence-engine",
      timestamp: new Date().toISOString()
    }
  };
}

/**
 * ------------------------------------------------------------
 * DEBUG FUNCTION
 * ------------------------------------------------------------
 */

export function debugConfidence() {
  const sample = getConfidence({
    telemetry: 0.9,
    diagnosis: 0.85,
    repair: 0.8,
    parts: 0.75,
    alerts: 0.6
  });

  console.log("=== Confidence Engine Debug ===");
  console.log(JSON.stringify(sample, null, 2));
}

/**
 * ============================================================
 * END OF FILE — JustDefenders ©
 * ============================================================
 */
