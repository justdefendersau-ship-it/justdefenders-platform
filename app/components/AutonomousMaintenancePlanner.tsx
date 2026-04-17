/*
Timestamp: 5 March 2026 17:30
File: app/components/AutonomousMaintenancePlanner.tsx

Purpose
-------
Displays AI-generated maintenance recommendations
for each vehicle in the fleet.

Shows:
• component health
• recommended actions
• priority level
• estimated maintenance cost
*/

"use client"

import { useEffect, useState } from "react"

type Recommendation = {

  system: string
  health: number
  action: string
  priority: string
  cost: number

}

type Plan = {

  vehicleId: string
  recommendations: Recommendation[]

}

export default function AutonomousMaintenancePlanner() {

  const [plans, setPlans] = useState<Plan[]>([])

  useEffect(() => {

    async function loadPlans() {

      const res = await fetch("/api/ml/maintenance-planner")
      const json = await res.json()

      setPlans(json)

    }

    loadPlans()

  }, [])

  if (!plans.length) {

    return <div>Generating maintenance plans...</div>

  }

  return (

    <div className="bg-white border rounded-xl p-6 shadow-sm">

      <h2 className="text-lg font-semibold mb-6">
        Autonomous Maintenance Planner
      </h2>

      <div className="space-y-6">

        {plans.map(plan => (

          <div
            key={plan.vehicleId}
            className="border rounded-lg p-4"
          >

            <div className="text-sm text-gray-500 mb-2">
              Vehicle ID
            </div>

            <div className="font-semibold mb-3">
              {plan.vehicleId}
            </div>

            <div className="space-y-2 text-sm">

              {plan.recommendations.map((r, i) => (

                <div
                  key={i}
                  className="flex justify-between"
                >

                  <span>
                    {r.system} ({r.health}%)
                  </span>

                  <span>
                    {r.action} — {r.priority}
                  </span>

                </div>

              ))}

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}