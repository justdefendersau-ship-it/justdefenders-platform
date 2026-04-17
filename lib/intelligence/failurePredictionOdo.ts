// JustDefenders ©
// File: /lib/intelligence/failurePredictionOdo.ts
// Timestamp: 30 March 2026 01:55

type RecordType = {
  vehicle_id: string
  part_id: string
  created_at: string
  odometer: number
}

export function predictFailuresOdometer(
  records: RecordType[],
  latestOdometers: Record<string, number>
) {
  const grouped: Record<string, RecordType[]> = {}

  records.forEach((r) => {
    const key = `${r.vehicle_id}_${r.part_id}`
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(r)
  })

  const results: any[] = []

  Object.values(grouped).forEach((logs) => {
    if (logs.length < 2) return

    logs.sort((a, b) => a.odometer - b.odometer)

    const distances: number[] = []

    for (let i = 1; i < logs.length; i++) {
      const d = logs[i].odometer - logs[i - 1].odometer
      if (d > 0) distances.push(d)
    }

    if (!distances.length) return

    const mdbf =
      distances.reduce((a, b) => a + b, 0) / distances.length

    const last = logs[logs.length - 1]

    // ✅ REAL CURRENT ODOMETER
    const currentOdo =
      latestOdometers[last.vehicle_id] || last.odometer

    const distanceSinceLast = currentOdo - last.odometer

    const frequencyFactor = Math.min(logs.length / 5, 2)

    let probability =
      (distanceSinceLast / mdbf) * frequencyFactor

    probability = Math.min(probability, 1)

    const kmToFailure = Math.max(mdbf - distanceSinceLast, 0)

    let risk = 'low'
    if (probability > 0.8) risk = 'critical'
    else if (probability > 0.6) risk = 'high'
    else if (probability > 0.3) risk = 'medium'

    results.push({
      vehicle_id: last.vehicle_id,
      part_id: last.part_id,
      mdbf: Math.round(mdbf),
      probability: Math.round(probability * 100),
      km_to_failure: Math.round(kmToFailure),
      risk,
    })
  })

  return results
}