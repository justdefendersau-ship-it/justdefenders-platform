// Timestamp 6 March 2026 22:05
// File: /app/analytics/components/FleetRiskChart.tsx

"use client"

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts"

type Props = {
  highRisk: number
  mediumRisk: number
  lowRisk: number
}

export default function FleetRiskChart({
  highRisk,
  mediumRisk,
  lowRisk
}: Props) {

  const data = [
    { name: "High Risk", value: highRisk },
    { name: "Medium Risk", value: mediumRisk },
    { name: "Low Risk", value: lowRisk }
  ]

  const COLORS = ["#ef4444", "#f59e0b", "#10b981"]

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="font-semibold mb-4">
        Fleet Risk Distribution
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={COLORS[index]}
              />

            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>

  )

}