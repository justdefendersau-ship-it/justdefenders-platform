/*
Timestamp: 5 March 2026 11:00
File: app/components/RiskTrendChart.tsx

Purpose
-------
Displays the Fleet Risk Trend chart using the Recharts analytics library.

Data Source
-----------
GET /api/risk/trend

This endpoint returns historical fleet risk data from the risk_history table.

This component renders a professional analytics line chart similar to
Stripe / Datadog dashboards.
*/

"use client"

import { useEffect, useState } from "react"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

type RiskHistory = {
  fleet_risk_score: number
  created_at: string
}

export default function RiskTrendChart() {

  const [data, setData] = useState<RiskHistory[]>([])

  useEffect(() => {

    async function loadTrend() {

      try {

        const res = await fetch("/api/risk/trend")
        const json = await res.json()

        setData(json)

      } catch (err) {

        console.error("Risk trend load error:", err)

      }

    }

    loadTrend()

  }, [])

  return (

    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

      <h2 className="text-lg font-semibold mb-4">
        Fleet Risk Trend
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="created_at" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="fleet_risk_score"
            stroke="#2563eb"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  )

}