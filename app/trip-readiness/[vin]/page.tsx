// ------------------------------------------------------
// File: app/trip-readiness/[vin]/page.tsx
// Timestamp: 18 March 2026 12:50
// JustDefenders ©
//
// Trip Pack Builder UI with Monetisation Layer
// ------------------------------------------------------

"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { exportTripPackPDF } from "@/app/lib/exportTripPack"
import { monetisationConfig } from "@/app/config/monetisation"
import { buildSupplierLink } from "@/app/lib/supplierLinks"

type Part = {
  id: string
  name: string
  price: number
  supplier?: string
  supplier_country?: string
  reliability_score?: number
  part_number?: string
}

export default function Page() {

  const params = useParams()
  const vin = params?.vin as string

  const [parts, setParts] = useState<Part[]>([])
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    if (!vin) return

    fetch(`/api/trip-pack/${vin}`)
      .then(async (res) => {

        if (!res.ok) throw new Error("API error")

        const text = await res.text()
        if (!text) throw new Error("Empty response")

        return JSON.parse(text)

      })
      .then(data => setParts(data.parts || []))
      .catch(err => {
        console.error(err)
        setParts([])
      })
      .finally(() => setLoading(false))

  }, [vin])

  const toggle = (id: string) => {
    setSelected(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const total = parts
    .filter(p => selected[p.id])
    .reduce((sum, p) => sum + (p.price || 0), 0)

  if (loading) {
    return <div className="p-6 text-white">Loading trip pack...</div>
  }

  return (

    <div className="p-6 text-white">

      <h1 className="text-2xl font-bold mb-4">
        Trip Pack Builder
      </h1>

      <div className="space-y-3">

        {parts.map(part => {

          const buyLink = buildSupplierLink(part)

          return (

            <div
              key={part.id}
              className="bg-zinc-800 p-3 rounded flex justify-between items-center"
            >

              <div>

                <label className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    checked={!!selected[part.id]}
                    onChange={() => toggle(part.id)}
                  />

                  {part.name}

                </label>

                <div className="text-sm text-gray-400">
                  {part.supplier} ({part.supplier_country})
                </div>

                {part.reliability_score && part.reliability_score > 80 && (
                  <div className="text-yellow-400 text-xs">
                    ⭐ High Reliability
                  </div>
                )}

              </div>

              <div className="text-right">

                <div className="text-green-400 font-bold">
                  ${part.price || 0}
                </div>

                {/* -------------------------------------------------- */}
                {/* BUY BUTTON (TOGGLED) */}
                {/* -------------------------------------------------- */}
                {monetisationConfig.ENABLE_BUY_BUTTONS && (
                  <a
                    href={buyLink}
                    target="_blank"
                    className="text-blue-400 text-sm underline"
                  >
                    Buy
                  </a>
                )}

              </div>

            </div>

          )

        })}

      </div>

     <div className="mt-6 flex justify-between items-center">

  <button
    onClick={() => {

      const selectedParts = parts.filter(p => selected[p.id])

      exportTripPackPDF(selectedParts, vin)

    }}
    className="bg-blue-600 px-4 py-2 rounded"
  >
    Export PDF
  </button>

  <div className="text-xl font-bold text-green-400">
    Total: ${total}
  </div>

</div>

    </div>

  )

}