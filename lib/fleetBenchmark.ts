// Timestamp: 1 March 2026 17:20
// Fleet Benchmark Utilities

export function calculatePercentile(
  value: number,
  dataset: number[]
): number {
  if (!dataset.length) return 0

  const sorted = [...dataset].sort((a, b) => a - b)
  const rank =
    sorted.findIndex((v) => v >= value) / sorted.length

  return Math.round(rank * 100)
}