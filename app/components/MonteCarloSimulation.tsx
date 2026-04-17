/*
Timestamp: 5 March 2026 14:10
File: app/components/MonteCarloSimulation.tsx

Purpose
-------
Displays Monte Carlo fleet failure simulation results.

This panel estimates expected failures and financial exposure
based on thousands of simulated fleet scenarios.
*/

"use client"

import { useEffect, useState } from "react"

type Simulation = {
  fleetSize: number
  expectedFailures: number
  worstCaseFailures: number
  insuranceExposure: number
}

export default function MonteCarloSimulation() {

  const [data, setData] = useState<Simulation | null>(null)

  useEffect(() => {

    async function loadSimulation() {

      const res = await fetch("/api/ml/monte-carlo")
      const json = await res.json()

      setData(json)

    }

    loadSimulation()

  }, [])

  if (!data) {
    return <div>Running Monte Carlo simulation...</div>
  }

  return (

    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

      <h2 className="text-lg font-semibold mb-4">
        Monte Carlo Fleet Risk Simulation
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <div>
          <div className="text-sm text-gray-500">
            Fleet Size
          </div>
          <div className="text-2xl font-semibold">
            {data.fleetSize}
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500">
            Expected Failures
          </div>
          <div className="text-2xl font-semibold">
            {data.expectedFailures}
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500">
            Worst Case Scenario
          </div>
          <div className="text-2xl font-semibold">
            {data.worstCaseFailures}
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500">
            Insurance Exposure
          </div>
          <div className="text-2xl font-semibold">
            ${data.insuranceExposure}
          </div>
        </div>

      </div>

    </div>

  )

}