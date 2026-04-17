'use client'

// JustDefenders ©
// File: /components/charts/FuelTrendChart.tsx
// Timestamp: 30 March 2026 00:08

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import { getFuelColour } from '@/lib/intelligence/colourLogic'

export default function FuelTrendChart({ data }: { data: any[] }) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="date" hide />
          <YAxis />
          <Tooltip />

          {/* Actual efficiency */}
          <Line
            type="monotone"
            dataKey="efficiency"
            stroke="#22c55e"
            strokeWidth={2}
            dot={(props: any) => {
              const colour = getFuelColour(props.payload.anomaly)
              return (
                <circle
                  cx={props.cx}
                  cy={props.cy}
                  r={4}
                  fill={colour}
                />
              )
            }}
          />

          {/* Baseline */}
          <Line
            type="monotone"
            dataKey="baseline"
            stroke="#94a3b8"
            strokeDasharray="4 4"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}