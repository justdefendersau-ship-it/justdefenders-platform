"use client"

// Timestamp: 13 March 2026 18:25
// Part Reliability Card

import { useEffect, useState } from "react"

export default function PartReliabilityCard({ part }: { part: string }) {

  const [data, setData] = useState<any>(null)

  useEffect(() => {

    async function load() {

      const res = await fetch(`/api/parts/reliability?part=${part}`)
      const result = await res.json()

      setData(result.reliability)

    }

    load()

  }, [part])

  if (!data) return null

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold mb-4">
        Reliability
      </h2>

      <div className="text-3xl font-bold mb-3">
        {data.score} / 10
      </div>

      <div className="space-y-1 text-sm">

        <div>
          Installs: {data.installs}
        </div>

        <div>
          Failures: {data.failures}
        </div>

        <div>
          Failure Rate: {(data.failureRate * 100).toFixed(1)}%
        </div>

      </div>

    </div>

  )

}