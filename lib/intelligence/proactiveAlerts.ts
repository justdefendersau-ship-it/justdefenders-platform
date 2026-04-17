// JustDefenders ©
// File: /lib/intelligence/proactiveAlerts.ts
// Timestamp: 30 March 2026 02:50

type FailurePrediction = {
  vehicle_id: string
  part_id: string
  probability: number
  km_to_failure: number
  risk: string
}

type FuelTrend = {
  vehicle_id: string
  anomaly: 'normal' | 'warning' | 'critical'
  change: number
}

type FleetRisk = {
  vehicle_id: string
  risk_score: number
  risk: string
}

export function generateProactiveAlerts({
  failures,
  fuel,
  fleetRisk,
}: {
  failures: FailurePrediction[]
  fuel: FuelTrend[]
  fleetRisk: FleetRisk[]
}) {
  const alerts: any[] = []

  // FAILURE ALERTS
  failures.forEach((f) => {
    if (f.probability > 70 || f.km_to_failure < 1000) {
      alerts.push({
        type: 'failure_prediction',
        vehicle_id: f.vehicle_id,
        severity: f.risk,
        message: `Part ${f.part_id} likely to fail in ${f.km_to_failure} km (${f.probability}%)`,
      })
    }
  })

  // FUEL ALERTS
  fuel.forEach((f) => {
    if (f.anomaly === 'critical' || f.change < -20) {
      alerts.push({
        type: 'fuel_degradation',
        vehicle_id: f.vehicle_id,
        severity: 'high',
        message: `Fuel efficiency dropping rapidly (${f.change}%)`,
      })
    }
  })

  // FLEET RISK ALERTS
  fleetRisk.forEach((v) => {
    if (v.risk === 'critical') {
      alerts.push({
        type: 'fleet_risk',
        vehicle_id: v.vehicle_id,
        severity: 'critical',
        message: `Vehicle is in CRITICAL risk state (${v.risk_score})`,
      })
    }
  })

  // SORT BY SEVERITY
  const severityRank: any = {
    critical: 4,
    high: 3,
    medium: 2,
    low: 1,
  }

  return alerts.sort(
    (a, b) => severityRank[b.severity] - severityRank[a.severity]
  )
}