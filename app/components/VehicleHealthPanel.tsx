"use client"

// Timestamp: 13 March 2026 16:05
// Vehicle Health Intelligence Panel

import { useEffect, useState } from "react"

export default function VehicleHealthPanel({ vin }: { vin: string }) {

  const [health, setHealth] = useState<any>(null)
  const [alerts, setAlerts] = useState<any[]>([])
  const [predictions, setPredictions] = useState<any[]>([])

  useEffect(() => {

    async function loadData() {

      const healthRes = await fetch(`/api/vehicle/health?vin=${vin}`)
      const healthData = await healthRes.json()

      const alertRes = await fetch(`/api/vehicle/alerts?vin=${vin}`)
      const alertData = await alertRes.json()

      const predictionRes = await fetch(`/api/vehicle/predictions?vin=${vin}`)
      const predictionData = await predictionRes.json()

      setHealth(healthData)
      setAlerts(alertData.alerts || [])
      setPredictions(predictionData.predictions || [])

    }

    loadData()

  }, [vin])

  if (!health) return null

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold mb-4">
        Vehicle Health
      </h2>

      <div className="text-4xl font-bold mb-4">
        {health.score}
      </div>

      <div className="space-y-3">

        {alerts.map((a, i) => (
          <div key={i} className="text-red-600">
            ⚠ {a.message}
          </div>
        ))}

        {predictions.map((p, i) => (
          <div key={i} className="text-yellow-600">
            🔧 {p.component} risk within {p.km_window} km
          </div>
        ))}

      </div>

    </div>
  )
}