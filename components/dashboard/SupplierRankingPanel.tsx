'use client'

// JustDefenders ©
// File: /components/dashboard/SupplierRankingPanel.tsx
// Timestamp: 30 March 2026 04:00

type Supplier = {
  supplier_id: string
  avg_price_diff: number
  price_score: number
  rating_score: number
  supplier_score: number
  tier: 'A' | 'B' | 'C'
}

function getColour(tier: Supplier['tier']) {
  if (tier === 'A') return 'text-green-500'
  if (tier === 'B') return 'text-yellow-400'
  return 'text-red-500'
}

function getLabel(tier: Supplier['tier']) {
  if (tier === 'A') return 'TOP SUPPLIER'
  if (tier === 'B') return 'RELIABLE'
  return 'LOW RANK'
}

export default function SupplierRankingPanel({
  data,
}: {
  data: Supplier[]
}) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-900 p-4 rounded-2xl">
        <h2 className="text-lg font-semibold mb-4">
          Supplier Rankings
        </h2>
        <div className="text-sm text-gray-500">
          No supplier data available
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 p-4 rounded-2xl">
      <h2 className="text-lg font-semibold mb-4">
        Supplier Rankings
      </h2>

      <div className="space-y-3">
        {data.map((s, i) => (
          <div
            key={`${s.supplier_id}_${i}`}
            className="flex justify-between items-center border-b border-gray-800 pb-2"
          >
            {/* LEFT */}
            <div className="text-sm text-gray-300">
              #{i + 1} {s.supplier_id}
            </div>

            {/* RIGHT */}
            <div className="text-right">
              <div className={`text-sm font-semibold ${getColour(s.tier)}`}>
                {s.supplier_score} ({s.tier})
              </div>

              <div className="text-xs text-gray-500">
                Price: {s.price_score} | Rating: {s.rating_score}
              </div>

              <div className={`text-xs ${getColour(s.tier)}`}>
                {getLabel(s.tier)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}