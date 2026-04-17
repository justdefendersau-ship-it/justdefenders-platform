// ------------------------------------------------------
// File: app/components/TripReadinessPanel.tsx
// Timestamp: 18 March 2026 01:05
// JustDefenders ©
//
// Defender Trip Readiness Dashboard Panel
// ------------------------------------------------------

"use client"

import { useEffect, useState } from "react"

type Readiness = {
  readiness_score: number
  issues: string[]
}

export default function TripReadinessPanel({ vin }: { vin: string }) {

  const [data, setData] = useState<Readiness | null>(null)

  useEffect(() => {

    async function load() {

      const res = await fetch(`/api/trip-readiness/${vin}`)
      const json = await res.json()

      setData(json)

    }

    load()

  }, [vin])

  if (!data) return null

  return (

    <div className="bg-neutral-900 rounded-lg p-6">

      <h2 className="text-white text-lg font-semibold mb-4">
        Trip Readiness
      </h2>

      <div className="text-3xl font-bold text-green-400">
        {data.readiness_score} / 100
      </div>

      <ul className="mt-4 text-sm text-gray-400 space-y-1">

        {data.issues.map((issue, i) => (
          <li key={i}>⚠ {issue}</li>
        ))}

      </ul>

    </div>

  )

}