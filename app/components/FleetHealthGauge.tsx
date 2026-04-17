"use client"

// Timestamp: 14 March 2026 10:25
// Fleet Health Intelligence Panel

import { useEffect, useState } from "react"

export default function FleetHealthGauge() {

  const [health, setHealth] = useState(0)
  const [healthy, setHealthy] = useState(0)
  const [warning, setWarning] = useState(0)
  const [critical, setCritical] = useState(0)

  useEffect(() => {

    async function loadHealth() {

      const res = await fetch("/api/analytics/fleet-health-score")
      const data = await res.json()

      setHealth(data.score || 0)
      setHealthy(data.healthy || 0)
      setWarning(data.warning || 0)
      setCritical(data.critical || 0)

    }

    loadHealth()

  }, [])

  const colour =
    health > 80 ? "text-green-400"
    : health > 60 ? "text-yellow-400"
    : "text-red-400"

  return (

    <div className="bg-slate-800 text-white rounded-xl p-6 shadow">

      <h2 className="text-lg font-semibold mb-4">
        Fleet Health
      </h2>

      <div className={`text-5xl font-bold ${colour}`}>
        {health}%
      </div>

      <div className="text-sm text-slate-400 mb-6">
        Average Vehicle Health
      </div>

      <div className="grid grid-cols-3 text-center text-sm">

        <div>
          <div className="text-green-400 font-semibold text-lg">
            {healthy}
          </div>
          Healthy
        </div>

        <div>
          <div className="text-yellow-400 font-semibold text-lg">
            {warning}
          </div>
          Warning
        </div>

        <div>
          <div className="text-red-400 font-semibold text-lg">
            {critical}
          </div>
          Critical
        </div>

      </div>

    </div>

  )

}