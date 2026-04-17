"use client"

// Timestamp: 14 March 2026 10:50
// Failure Risk Prediction Panel

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function FailureRiskPanel() {

  const router = useRouter()
  const [risks, setRisks] = useState<any[]>([])

  useEffect(() => {

    async function loadRisks() {

      const res = await fetch("/api/analytics/failure-risk")
      const data = await res.json()

      setRisks(data.risks || [])

    }

    loadRisks()

  }, [])

  return (

    <div className="bg-slate-800 text-white rounded-xl p-6 shadow">

      <h2 className="text-lg font-semibold mb-4">
        Failure Risk (Next 90 Days)
      </h2>

      <div className="space-y-3">

        {risks.map((r, i) => (

          <div
            key={i}
            onClick={() => router.push(`/vehicles/${r.vin}`)}
            className="flex justify-between items-center border border-slate-700 rounded-lg p-3 hover:bg-slate-700 cursor-pointer"
          >

            <div>

              <div className="font-semibold">
                {r.vehicle}
              </div>

              <div className="text-sm text-slate-400">
                {r.component}
              </div>

            </div>

            <div className="text-red-400 font-bold">
              {r.risk}%
            </div>

          </div>

        ))}

      </div>

    </div>

  )

}