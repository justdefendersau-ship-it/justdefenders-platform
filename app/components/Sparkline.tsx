/**
 * =====================================================
 * JustDefenders ©
 * FILE: /app/components/Sparkline.tsx
 * TIMESTAMP: 21 March 2026 14:00 (Sydney)
 * PURPOSE:
 * SMALL COMPACT SPARKLINE (FIX SIZE ISSUE)
 * =====================================================
 */

"use client"

import { LineChart, Line, ResponsiveContainer } from "recharts"

export default function Sparkline({ data }: { data: any[] }) {
  return (
    <div style={{ width: "100%", height: 20 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}