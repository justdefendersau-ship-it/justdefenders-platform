"use client"

// Timestamp 7 March 2026
// File: /app/analytics/network-intelligence/page.tsx

import { useEffect, useState } from "react"

export default function NetworkIntelligence() {

  const [data, setData] = useState<any>(null)

  useEffect(() => {

    fetch("/api/analytics/reliability-benchmarks")
      .then(res => res.json())
      .then(setData)

  }, [])

  if (!data) {

    return <div className="p-10">Loading network intelligence...</div>

  }

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">

        Global Reliability Intelligence Network

      </h1>

      <div className="mb-10">

        <h2 className="text-xl font-semibold mb-3">

          Industry Failure Benchmarks

        </h2>

        {data.benchmarks.map((b: any, i: number) => (

          <div key={i} className="flex justify-between border-b py-2">

            <span>{b.component}</span>

            <span>{(b.industry_failure_rate * 100).toFixed(1)}%</span>

          </div>

        ))}

      </div>

      <div>

        <h2 className="text-xl font-semibold mb-3">

          Global Reliability Signals

        </h2>

        {data.signals.map((s: any, i: number) => (

          <div key={i} className="border-b py-2">

            {s.description}

          </div>

        ))}

      </div>

    </div>

  )

}