"use client"

// Timestamp 6 March 2026 14:30
// File: /app/investigation/page.tsx

import { useState } from "react"

export default function InvestigationWorkbench() {

  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any>(null)

  async function search() {

    const res = await fetch(`/api/investigation/search?q=${query}`)
    const data = await res.json()

    setResults(data)

  }

  return (

    <div className="p-10 space-y-8">

      <h1 className="text-3xl font-bold">

        Failure Investigation Workbench

      </h1>

      <div className="flex space-x-2">

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search VIN, part, supplier, failure..."
          className="border p-3 w-full"
        />

        <button
          onClick={search}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Investigate
        </button>

      </div>

      {results && (

        <div className="space-y-8">

          <section>

            <h2 className="text-xl font-semibold mb-2">
              Vehicles
            </h2>

            {results.vehicles?.map((v: any, i: number) => (

              <div key={i} className="border-b py-2">

                VIN: {v.vin}

              </div>

            ))}

          </section>

          <section>

            <h2 className="text-xl font-semibold mb-2">
              Components
            </h2>

            {results.components?.map((c: any, i: number) => (

              <div key={i} className="border-b py-2">

                Part: {c.part_number}

              </div>

            ))}

          </section>

          <section>

            <h2 className="text-xl font-semibold mb-2">
              Suppliers
            </h2>

            {results.suppliers?.map((s: any, i: number) => (

              <div key={i} className="border-b py-2">

                Supplier: {s.name}

              </div>

            ))}

          </section>

          <section>

            <h2 className="text-xl font-semibold mb-2">
              AI Insights
            </h2>

            {results.insights?.map((i: any, index: number) => (

              <div key={index} className="border-b py-2">

                {i.description}

              </div>

            ))}

          </section>

        </div>

      )}

    </div>

  )

}