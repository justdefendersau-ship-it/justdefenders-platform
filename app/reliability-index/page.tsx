"use client"

// Timestamp 6 March 2026 16:00
// File: /app/reliability-index/page.tsx

import { useEffect, useState } from "react"

export default function ReliabilityIndexPage() {

  const [components, setComponents] = useState<any[]>([])
  const [suppliers, setSuppliers] = useState<any[]>([])

  useEffect(() => {

    fetch("/api/reliability-index?type=component")
      .then(res => res.json())
      .then(data => setComponents(data.results))

    fetch("/api/reliability-index?type=supplier")
      .then(res => res.json())
      .then(data => setSuppliers(data.results))

  }, [])

  return (

    <div className="p-10 space-y-10">

      <h1 className="text-3xl font-bold">

        Global Defender Reliability Index

      </h1>

      <section>

        <h2 className="text-xl font-semibold mb-4">

          Top Reliable Components

        </h2>

        {components.map((c, i) => (

          <div key={i} className="border-b py-2 flex justify-between">

            <span>{c.entity_id}</span>
            <span>Score: {c.reliability_score}</span>

          </div>

        ))}

      </section>

      <section>

        <h2 className="text-xl font-semibold mb-4">

          Supplier Reliability Rankings

        </h2>

        {suppliers.map((s, i) => (

          <div key={i} className="border-b py-2 flex justify-between">

            <span>{s.entity_id}</span>
            <span>Score: {s.reliability_score}</span>

          </div>

        ))}

      </section>

    </div>

  )

}