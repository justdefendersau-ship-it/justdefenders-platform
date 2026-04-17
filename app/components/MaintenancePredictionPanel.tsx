"use client"

// Timestamp: 13 March 2026 20:35
// Maintenance Prediction Panel

import { useEffect, useState } from "react"

export default function MaintenancePredictionPanel({
  vin
}: {
  vin: string
}) {

  const [predictions, setPredictions] = useState<any[]>([])

  useEffect(() => {

    async function loadPredictions() {

      const res = await fetch(
        `/api/vehicle/predictive-maintenance?vin=${vin}`
      )

      const data = await res.json()

      setPredictions(data.predictions || [])

    }

    loadPredictions()

  }, [vin])

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold mb-4">
        Predictive Maintenance
      </h2>

      <div className="space-y-3">

        {predictions.map((p, i) => (

          <div key={i} className="border rounded p-3">

            <div className="font-semibold">
              {p.component}
            </div>

            <div className="text-sm text-gray-600">
              {p.recommendation}
            </div>

          </div>

        ))}

      </div>

    </div>

  )

}