'use client'

// JustDefenders ©
// File: /components/charts/FailureTrendChart.tsx
// Timestamp: 30 March 2026 00:12

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

import { getFailureColour } from '@/lib/intelligence/colourLogic'

export default function FailureTrendChart({ data }: { data: any[] }) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="date" hide />
          <YAxis />
          <Tooltip />

          <Bar dataKey="failures">
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={getFailureColour(entry.change)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}