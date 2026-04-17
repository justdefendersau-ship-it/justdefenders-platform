
"use client"

/*
=====================================================
INTELLIGENCE DASHBOARD
Timestamp: 1 March 2026 15:10

Displays:
✔ Percentile ranking
✔ Confidence score
✔ Alerts
✔ Heatmap summary
=====================================================
*/

import { useEffect, useState } from "react"
import { useVehicle } from "@/lib/vehicleContext"

export default function IntelligencePage() {

  const { vehicleId } = useVehicle()

  const [percentile, setPercentile] = useState<any>([])
  const [confidence, setConfidence] = useState(0)
  const [alerts, setAlerts] = useState<string[]>([])
  const [heatmap, setHeatmap] = useState<any>({})

  useEffect(() => {
    if (!vehicleId) return

    fetch("/api/intelligence/percentile")
      .then(res => res.json())
      .then(setPercentile)

    fetch(`/api/intelligence/confidence?vehicle_id=${vehicleId}`)
      .then(res => res.json())
      .then(data => setConfidence(data.confidence))

    fetch(`/api/intelligence/alerts?vehicle_id=${vehicleId}`)
      .then(res => res.json())
      .then(setAlerts)

    fetch("/api/intelligence/heatmap")
      .then(res => res.json())
      .then(setHeatmap)

  }, [vehicleId])

  return (
    <div>

      <div className="card">
        <h2>Risk Intelligence</h2>
        <p>Confidence Score: {(confidence * 100).toFixed(0)}%</p>
        {alerts.map((a, i) => (
          <p key={i} style={{ color: "red" }}>{a}</p>
        ))}
      </div>

      <div className="card">
        <h3>Fleet Percentile</h3>
        {percentile.map((p: any) => (
          <div key={p.vehicle_id}>
            Vehicle {p.vehicle_id} — {p.percentile.toFixed(0)}%
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Failure Heatmap</h3>
        {Object.entries(heatmap).map(([cat, count]: any) => (
          <div key={cat}>
            {cat}: {count}
          </div>
        ))}
      </div>

    </div>
  )
}