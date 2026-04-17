// JustDefenders ©
// File: /lib/intelligence/trendUtils.ts
// Timestamp: 29 March 2026 23:40

export function calculatePercentageChange(current: number, previous: number) {
  if (!previous || previous === 0) return 0
  return ((current - previous) / previous) * 100
}

export function getTrendDirection(value: number) {
  if (value > 5) return 'up'
  if (value < -5) return 'down'
  return 'stable'
}

export function detectAnomaly(
  current: number,
  baseline: number
): 'normal' | 'warning' | 'critical' {
  if (!baseline) return 'normal'

  const drop = ((baseline - current) / baseline) * 100

  if (drop >= 50) return 'critical'
  if (drop >= 30) return 'warning'
  return 'normal'
}