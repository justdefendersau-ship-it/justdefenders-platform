"use client"

// Timestamp: 14 March 2026 09:30
// Vehicle Health Sparkline

import { useEffect, useState } from "react"

export default function HealthSparkline({ vin }: { vin: string }) {

  const [points, setPoints] = useState<number[]>([])

  useEffect(() => {

    async function loadTrend() {

      const res = await fetch(`/api/vehicle/health-trend?vin=${vin}`)
      const data = await res.json()

      setPoints(data.points || [])

    }

    loadTrend()

  }, [vin])

  return (

    <div className="flex items-end gap-[2px] h-6">

      {points.map((p, i) => (

        <div
          key={i}
          style={{ height: `${p}%` }}
          className="w-[3px] bg-green-400 rounded-sm"
        />

      ))}

    </div>

  )

}