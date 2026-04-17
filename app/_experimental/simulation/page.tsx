"use client"

// Timestamp 6 March 2026 15:30
// File: /app/simulation/page.tsx

import { useState } from "react"

export default function SimulationDashboard() {

  const [result, setResult] = useState<any>(null)

  async function runSimulation() {

    const res = await fetch("/api/ai/reliability-simulation", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        organization_id: "demo-org",
        horizon_days: 180

      })

    })

    const data = await res.json()

    setResult(data.simulation)

  }

  return (

    <div className="p-10 space-y-6">

      <h1 className="text-3xl font-bold">

        Reliability Simulation Engine

      </h1>

      <button
        onClick={runSimulation}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Run Simulation
      </button>

      {result && (

        <div className="space-y-2 border-t pt-4">

          <div>
            Vehicles Simulated: {result.vehicles_simulated}
          </div>

          <div>
            Predicted Failures: {result.predicted_failures}
          </div>

          <div>
            Predicted Breakdowns: {result.predicted_breakdowns}
          </div>

          <div>
            Predicted Maintenance Cost: ${result.predicted_maintenance_cost}
          </div>

        </div>

      )}

    </div>

  )

}