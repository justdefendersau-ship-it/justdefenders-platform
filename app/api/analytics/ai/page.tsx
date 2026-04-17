"use client"

// Timestamp 7 March 2026
// File: /app/analytics/ai/page.tsx

import { useEffect, useState } from "react"

export default function AIInsights() {

  const [data, setData] = useState<any[]>([])

  useEffect(() => {

    fetch("/api/analytics/ai-insights")
      .then(res => res.json())
      .then(d => setData(d.insights))

  }, [])

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">

        Autonomous Reliability AI

      </h1>

      {data.map((i, index) => (

        <div
          key={index}
          className="border-b py-3"
        >

          <div className="font-semibold">

            {i.insight_type}

          </div>

          <div>

            {i.description}

          </div>

        </div>

      ))}

    </div>

  )

}