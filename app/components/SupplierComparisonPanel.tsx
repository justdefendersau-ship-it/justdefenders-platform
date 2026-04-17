"use client"

// Timestamp: 13 March 2026 21:35
// Supplier Comparison Panel

import { useEffect, useState } from "react"

export default function SupplierComparisonPanel({
  part
}: {
  part: string
}) {

  const [suppliers, setSuppliers] = useState<any[]>([])

  useEffect(() => {

    async function loadSuppliers() {

      const res = await fetch(`/api/parts/suppliers?part=${part}`)
      const data = await res.json()

      setSuppliers(data.suppliers || [])

    }

    loadSuppliers()

  }, [part])

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold mb-4">
        Suppliers
      </h2>

      <div className="space-y-3">

        {suppliers.map((s, i) => (

          <div key={i} className="border rounded p-3 flex justify-between">

            <span>
              {s.suppliers?.name}
            </span>

            <span className="font-semibold">
              {s.currency} {s.price}
            </span>

          </div>

        ))}

      </div>

    </div>

  )

}