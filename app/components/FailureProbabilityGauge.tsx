"use client"

// Timestamp: 13 March 2026 16:30
// Failure Probability Gauge

import { useEffect, useState } from "react"

export default function FailureProbabilityGauge({ vin }: { vin: string }) {

  const [components, setComponents] = useState<any[]>([])

  useEffect(() => {

    async function load() {

      const res = await fetch(`/api/vehicle/failure-probability?vin=${vin}`)
      const data = await res.json()

      setComponents(data.components || [])

    }

    load()

  }, [vin])

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold mb-4">
        Failure Risk
      </h2>

      <div className="space-y-4">

        {components.map((c, i) => (

          <div key={i} className="border rounded p-4">

            <div className="flex justify-between">

              <span className="font-semibold">
                {c.component}
              </span>

              <span className="font-bold">
                {c.probability}%
              </span>

            </div>

            <div className="w-full bg-gray-200 rounded h-3 mt-2">

              <div
                className="bg-red-500 h-3 rounded"
                style={{ width: `${c.probability}%` }}
              />

            </div>

            <p className="text-sm text-gray-500 mt-1">
              Risk within {c.km_window} km
            </p>

          </div>

        ))}

      </div>

    </div>
  )
}