/**
 * =====================================================
 * JustDefenders ©
 * FILE: /app/components/StatusDot.tsx
 * TIMESTAMP: 21 March 2026 13:40 (Sydney)
 * PURPOSE:
 * SMALLER STATUS DOTS (FIX SIZE)
 * =====================================================
 */

export default function StatusDot({ status }: { status: "green" | "yellow" | "red" }) {
  const map = {
    green: "bg-green-400",
    yellow: "bg-yellow-400",
    red: "bg-red-400"
  }

  return (
    <span className={`w-1.5 h-1.5 rounded-full ${map[status]}`} />
  )
}