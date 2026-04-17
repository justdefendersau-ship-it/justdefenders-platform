"use client"

// Timestamp: 14 March 2026 11:05
// Supplier Reliability Intelligence Panel

import { useEffect, useState } from "react"

export default function SupplierReliabilityPanel() {

  const [suppliers, setSuppliers] = useState<any[]>([])

  useEffect(() => {

    async function loadSuppliers() {

      const res = await fetch("/api/analytics/supplier-reliability")
      const data = await res.json()

      setSuppliers(data.suppliers || [])

    }

    loadSuppliers()

  }, [])

  return (

    <div className="bg-slate-800 text-white rounded-xl p-6 shadow">

      <h2 className="text-lg font-semibold mb-4">
        Supplier Reliability
      </h2>

      <div className="space-y-3">

        {suppliers.map((s, i) => (

          <div
            key={i}
            className="flex justify-between items-center border border-slate-700 rounded-lg p-3"
          >

            <div>

              <div className="font-semibold">
                {s.supplier}
              </div>

              <div className="text-sm text-slate-400">
                {s.component}
              </div>

            </div>

            <div className={`font-bold ${s.rate < 10 ? "text-green-400" : s.rate < 20 ? "text-yellow-400" : "text-red-400"}`}>
              {s.rate}%
            </div>

          </div>

        ))}

      </div>

    </div>

  )

}