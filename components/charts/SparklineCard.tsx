'use client'

// JustDefenders ©
// File: /components/charts/SparklineCard.tsx
// Timestamp: 30 March 2026 00:15

import {
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts'

import TrendBadge from './TrendBadge'

export default function SparklineCard({
  title,
  data,
  dataKey,
  change,
}: any) {
  const latest = data[data.length - 1]?.[dataKey]

  return (
    <div className="p-4 bg-gray-900 rounded-2xl">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">{title}</span>
        <TrendBadge value={change} />
      </div>

      <div className="text-xl font-semibold mb-2">
        {latest}
      </div>

      <div className="h-[60px]">
        <ResponsiveContainer>
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey={dataKey}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}