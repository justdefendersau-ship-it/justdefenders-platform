"use client"

// Timestamp: 14 March 2026 12:05
// Parts Reliability Intelligence Panel

import { useEffect, useState } from "react"

export default function PartsReliabilityPanel() {

  const [parts, setParts] = useState<any[]>([])

  useEffect(() => {

    async function loadParts() {

      const res = await fetch("/api/analytics/parts-reliability")
      const data = await res.json()

      setParts(data.parts || [])

    }

    loadParts()

  }, [])

  return (

    <div className="bg-slate-800 text-white rounded-xl p-6 shadow">

      <h2 className="text-lg font-semibold mb-4">
        Parts Reliability
      </h2>

      <div className="space-y-3">

        {parts.map((p, i) => (

          <div
            key={i}
            className="flex justify-between items-center border border-slate-700 rounded-lg p-3"
          >

            <div>

              <div className="font-semibold">
                {p.part}
              </div>

              <div className="text-sm text-slate-400">
                {p.supplier}
              </div>

            </div>

            <div className="text-right">

              <div className="text-sm text-slate-300">
                Failure {p.failure_rate}%
              </div>

              <div className="text-xs text-slate-500">
                Life {p.life_years} yrs
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}