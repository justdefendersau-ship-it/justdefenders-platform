"use client"

// Timestamp 6 March 2026 19:00
// File: /app/marketplace/demand/page.tsx

import { useState } from "react"

export default function DemandForecastPage() {

  const [part, setPart] = useState("")
  const [forecast, setForecast] = useState<any>(null)

  async function search() {

    const res = await fetch(`/api/marketplace/demand?part_number=${part}`)
    const data = await res.json()

    setForecast(data.forecast)

  }

  return (

    <div className="p-10 space-y-6">

      <h1 className="text-3xl font-bold">

        Parts Demand Forecast

      </h1>

      <div className="flex space-x-2">

        <input
          value={part}
          onChange={(e) => setPart(e.target.value)}
          placeholder="Enter part number"
          className="border p-3 w-full"
        />

        <button
          onClick={search}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Forecast
        </button>

      </div>

      {forecast && (

        <div className="border-t pt-4 space-y-2">

          <div>
            Predicted Failures: {forecast.predicted_failures}
          </div>

          <div>
            Predicted Demand: {forecast.predicted_demand}
          </div>

          <div>
            Forecast Horizon: {forecast.forecast_horizon_days} days
          </div>

          <div>
            Confidence: {(forecast.confidence * 100).toFixed(1)}%
          </div>

        </div>

      )}

    </div>

  )

}