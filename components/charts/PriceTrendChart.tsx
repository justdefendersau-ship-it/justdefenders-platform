'use client'

// JustDefenders ©
// File: /components/charts/PriceTrendChart.tsx
// Timestamp: 30 March 2026 00:10

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import { getPriceColour } from '@/lib/intelligence/colourLogic'

export default function PriceTrendChart({ data }: { data: any[] }) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="date" hide />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="price"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={(props: any) => {
              const colour = getPriceColour(props.payload.change)
              return (
                <circle cx={props.cx} cy={props.cy} r={4} fill={colour} />
              )
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}