// ------------------------------------------------------
// File: app/parts/page.tsx
// Timestamp: 18 March 2026 09:55
// JustDefenders ©
//
// Smart Parts Search Page
// Auto-filters based on failure component
// ------------------------------------------------------

"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

type Part = {
  id: string
  name: string
  category: string
  price?: number
}

export default function PartsPage() {

  const searchParams = useSearchParams()
  const component = searchParams.get("component")

  const [recommendations, setRecommendations] = useState<string[]>([])
  const [parts, setParts] = useState<Part[]>([])

  // Fetch recommended categories
  useEffect(() => {

    if (!component) return

    fetch(`/api/parts-recommendations?component=${component}`)
      .then(res => res.json())
      .then(data => {

        setRecommendations(data.recommendations || [])

      })

  }, [component])

  // Fetch parts (basic version)
  useEffect(() => {

    if (recommendations.length === 0) return

    // Replace later with Supabase query
    const mockParts: Part[] = recommendations.map((r, i) => ({
      id: `${i}`,
      name: `${r} (Recommended)`,
      category: r,
      price: Math.floor(Math.random() * 500) + 50
    }))

    setParts(mockParts)

  }, [recommendations])

  return (

    <div className="p-6 text-white">

      <h1 className="text-2xl font-bold mb-4">
        Parts Search
      </h1>

      {component && (
        <div className="mb-4 text-green-400">
          Showing recommendations for: <strong>{component}</strong>
        </div>
      )}

      {/* Categories */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Recommended Categories</h2>

        <div className="flex flex-wrap gap-2">
          {recommendations.map((r, i) => (
            <span key={i} className="bg-zinc-800 px-3 py-1 rounded">
              {r}
            </span>
          ))}
        </div>
      </div>

      {/* Parts List */}
      <div className="space-y-3">

        {parts.map((part) => (

          <div
            key={part.id}
            className="p-4 bg-zinc-900 rounded hover:bg-zinc-800"
          >
            <div className="font-semibold">{part.name}</div>
            <div className="text-sm text-gray-400">
              {part.category}
            </div>
            <div className="text-green-400 mt-1">
              ${part.price}
            </div>
          </div>

        ))}

      </div>

    </div>

  )

}