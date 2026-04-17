/*
JustDefenders ©
Vehicle Health Score Engine

File: app/lib/healthScoreEngine.ts
Timestamp: 15 March 2026 17:07
*/

export interface HealthInputSignals {

  mileage: number
  vehicleAgeYears: number
  openFaultCodes: number
  monthsSinceService: number
  reliabilityEvents: number

}

export interface HealthScoreResult {

  score: number
  riskLevel: "LOW" | "MEDIUM" | "HIGH"

}

export function calculateVehicleHealthScore(
  signals: HealthInputSignals
): HealthScoreResult {

  let score = 100

  /*
  Mileage impact
  */

  if (signals.mileage > 200000) score -= 15
  else if (signals.mileage > 150000) score -= 10
  else if (signals.mileage > 100000) score -= 5

  /*
  Age impact
  */

  if (signals.vehicleAgeYears > 20) score -= 15
  else if (signals.vehicleAgeYears > 15) score -= 10
  else if (signals.vehicleAgeYears > 10) score -= 5

  /*
  Fault codes impact
  */

  score -= signals.openFaultCodes * 4

  /*
  Maintenance recency
  */

  if (signals.monthsSinceService > 24) score -= 15
  else if (signals.monthsSinceService > 12) score -= 8
  else if (signals.monthsSinceService > 6) score -= 3

  /*
  Reliability events
  */

  score -= signals.reliabilityEvents * 6

  /*
  Clamp score
  */

  if (score < 0) score = 0
  if (score > 100) score = 100

  /*
  Risk classification
  */

  let riskLevel: "LOW" | "MEDIUM" | "HIGH"

  if (score >= 80) riskLevel = "LOW"
  else if (score >= 60) riskLevel = "MEDIUM"
  else riskLevel = "HIGH"

  return {
    score,
    riskLevel
  }

}