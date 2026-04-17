"use client"

// Timestamp 6 March 2026 14:00
// File: /app/components/[part_number]/page.tsx

import { useEffect, useState } from "react"

export default function ComponentPage(
  { params }: { params: { part_number: string } }
) {

  const [data, setData] = useState<any>(null)

  useEffect(() => {

    fetch(`/api/components/${params.part_number}`)
      .then(res => res.json())
      .then(setData)

  }, [])

  if (!data) {

    return <div className="p-10">Loading component intelligence...</div>

  }

  return (

    <div className="p-10 space-y-10">

      <h1 className="text-3xl font-bold">

        Component Reliability — {params.part_number}

      </h1>

      <section>

        <h2 className="text-xl font-semibold mb-3">

          Failure Statistics

        </h2>

        <div>

          Failure Count: {data.component?.failure_count}

        </div>

        <div>

          Vehicles Affected: {data.component?.vehicles_affected}

        </div>

        <div>

          Failure Rate: {data.component?.failure_rate}

        </div>

      </section>

      <section>

        <h2 className="text-xl font-semibold mb-3">

          Industry Benchmark

        </h2>

        <div>

          Industry Failure Rate:
          {(data.benchmark?.industry_failure_rate * 100)?.toFixed(2)}%

        </div>

      </section>

      <section>

        <h2 className="text-xl font-semibold mb-3">

          Suppliers

        </h2>

        {data.suppliers?.map((s: any, i: number) => (

          <div key={i} className="border-b py-2">

            Supplier: {s.supplier_id}

          </div>

        ))}

      </section>

      <section>

        <h2 className="text-xl font-semibold mb-3">

          Market Demand

        </h2>

        <div>

          Demand Score: {data.demand?.demand_score ?? "N/A"}

        </div>

      </section>

    </div>

  )

}