"use client"

/*
=====================================================
ANIMATED FUEL TREND CHART
Timestamp: 1 March 2026 11:05
=====================================================
*/

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

export default function FuelChart({ data }: any) {

  if (!data || data.length === 0)
    return <p>No trend data</p>

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="l_per_100km"
          stroke="#8884d8"
          strokeWidth={2}
          dot={false}
          isAnimationActive={true}
          animationDuration={800}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}