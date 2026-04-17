/*
Timestamp: 5 March 2026 14:20
File: app/components/FailureTrendDashboard.tsx

Purpose
-------
Displays detected mechanical failure trends
from fleet analytics.

This helps identify emerging reliability issues
across Defender vehicles.
*/

"use client"

import { useEffect, useState } from "react"

type Trend = {

  part_name: string
  failure_count: number
  previous_period_failures: number
  growth_rate: number
  trend_level: string

}

export default function FailureTrendDashboard() {

  const [rows,setRows] = useState<Trend[]>([])

  useEffect(()=>{

    async function load(){

      const res = await fetch("/api/intelligence/failure-trend-detection")
      const json = await res.json()

      setRows(json)

    }

    load()

  },[])

  return (

    <div className="bg-white border rounded-xl p-6 shadow-sm">

      <h2 className="text-lg font-semibold mb-4">
        Emerging Failure Trends
      </h2>

      <table className="w-full text-sm">

        <thead>

          <tr className="border-b">

            <th className="text-left py-2">Component</th>
            <th>Failures</th>
            <th>Previous</th>
            <th>Growth</th>
            <th>Trend Level</th>

          </tr>

        </thead>

        <tbody>

          {rows.map((r,i)=>(

            <tr key={i} className="border-b">

              <td className="py-2">{r.part_name}</td>
              <td>{r.failure_count}</td>
              <td>{r.previous_period_failures}</td>
              <td>{Math.round(r.growth_rate*100)}%</td>
              <td>{r.trend_level}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}