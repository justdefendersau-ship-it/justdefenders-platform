// JustDefenders ©
// File: /lib/intelligence/colourLogic.ts
// Timestamp: 30 March 2026 00:05

export function getFuelColour(anomaly: string) {
  if (anomaly === 'critical') return '#ef4444' // red
  if (anomaly === 'warning') return '#f59e0b' // amber
  return '#22c55e' // green
}

export function getPriceColour(change: number) {
  if (change > 10) return '#ef4444' // price rising = bad
  if (change < -10) return '#22c55e' // price dropping = good
  return '#94a3b8'
}

export function getFailureColour(change: number) {
  if (change > 20) return '#ef4444'
  if (change > 5) return '#f59e0b'
  return '#22c55e'
}