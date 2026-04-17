/*
Timestamp: 5 March 2026 18:10
File: app/components/FleetOptimizationEngine.tsx

Purpose
-------
Displays strategic fleet optimization recommendations.

Shows:
• projected fleet maintenance budget
• recommended retirements
• per-vehicle strategy
*/

"use client"

import { useEffect, useState } from "react"

type Decision = {

  vehicleId: string
  age: number
  health: number
  decision: string
  projectedMaintenanceCost: number

}

type Optimization = {

  fleetSize: number
  projectedMaintenanceBudget: number
  recommendedRetirements: number
  vehicleDecisions: Decision[]

}

export default function FleetOptimizationEngine() {

  const [data, setData] = useState<Optimization | null>(null)

  useEffect(() => {

    async function loadOptimizer() {

      const res = await fetch("/api/ml/fleet-optimizer")
      const json = await res.json()

      setData(json)

    }

    loadOptimizer()

  }, [])

  if (!data) {
    return <div>Running fleet optimization engine...</div>
  }

  return (

    <div className="bg-white border rounded-xl p-6 shadow-sm">

      <h2 className="text-lg font-semibold mb-6">
        Fleet Optimization Engine
      </h2>

      <div className="grid grid-cols-3 gap-6 mb-6">

        <div>
          <div className="text-sm text-gray-500">
            Fleet Size
          </div>
          <div className="text-xl font-semibold">
            {data.fleetSize}
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500">
            Projected Maintenance Budget
          </div>
          <div className="text-xl font-semibold">
            ${data.projectedMaintenanceBudget}
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500">
            Recommended Retirements
          </div>
          <div className="text-xl font-semibold">
            {data.recommendedRetirements}
          </div>
        </div>

      </div>

      <div className="space-y-3 text-sm">

        {data.vehicleDecisions.map((v, i) => (

          <div
            key={i}
            className="flex justify-between border-b pb-1"
          >

            <span>
              {v.vehicleId.slice(0,8)} — {v.health}% health
            </span>

            <span>
              {v.decision}
            </span>

          </div>

        ))}

      </div>

    </div>

  )

}