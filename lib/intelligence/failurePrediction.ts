// JustDefenders ©
// File: /lib/intelligence/failurePrediction.ts
// Timestamp: 30 March 2026 00:40

type FailureRecord = {
  vehicle_id: string
  part_id: string
  created_at: string
}

function daysBetween(a: string, b: string) {
  const diff = new Date(b).getTime() - new Date(a).getTime()
  return diff / (1000 * 60 * 60 * 24)
}

export function predictFailures(records: FailureRecord[]) {
  const grouped: Record<string, FailureRecord[]> = {}

  // Group by vehicle + part
  records.forEach((r) => {
    const key = `${r.vehicle_id}_${r.part_id}`
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(r)
  })

  const predictions: any[] = []

  Object.entries(grouped).forEach(([key, logs]) => {
    if (logs.length < 2) return // need history

    // sort oldest → newest
    logs.sort(
      (a, b) =>
        new Date(a.created_at).getTime() -
        new Date(b.created_at).getTime()
    )

    // Calculate MTBF
    const intervals: number[] = []
    for (let i = 1; i < logs.length; i++) {
      intervals.push(
        daysBetween(logs[i - 1].created_at, logs[i].created_at)
      )
    }

    const mtbf =
      intervals.reduce((a, b) => a + b, 0) / intervals.length

    const lastFailure = logs[logs.length - 1].created_at
    const now = new Date().toISOString()

    const timeSinceLast = daysBetween(lastFailure, now)

    // frequency factor
    const frequencyFactor = Math.min(logs.length / 5, 2)

    // probability
    let probability = (timeSinceLast / mtbf) * frequencyFactor
    probability = Math.min(probability, 1)

    const daysToFailure = Math.max(mtbf - timeSinceLast, 0)

    let risk = 'low'
    if (probability > 0.8) risk = 'critical'
    else if (probability > 0.6) risk = 'high'
    else if (probability > 0.3) risk = 'medium'

    predictions.push({
      vehicle_id: logs[0].vehicle_id,
      part_id: logs[0].part_id,
      mtbf: Math.round(mtbf),
      probability: Math.round(probability * 100),
      days_to_failure: Math.round(daysToFailure),
      risk,
    })
  })

  return predictions
}