// Timestamp 6 March 2026 22:05
// File: /app/analytics/components/ReliabilityTimeline.tsx

"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

type DataPoint = {
  date: string
  reliability: number
}

export default function ReliabilityTimeline({
  data
}: {
  data: DataPoint[]
}) {

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="font-semibold mb-4">
        Global Reliability Timeline
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <LineChart data={data}>

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="reliability"
            stroke="#3b82f6"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  )

}