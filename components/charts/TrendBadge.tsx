'use client'

// JustDefenders ©
// File: /components/charts/TrendBadge.tsx
// Timestamp: 29 March 2026 23:55

export default function TrendBadge({
  value,
}: {
  value: number
}) {
  if (value > 5) {
    return <span className="text-red-500">↑ {value}%</span>
  }

  if (value < -5) {
    return <span className="text-green-500">↓ {Math.abs(value)}%</span>
  }

  return <span className="text-gray-400">→ {value}%</span>
}