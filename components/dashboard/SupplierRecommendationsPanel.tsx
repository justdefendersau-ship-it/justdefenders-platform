'use client'

// JustDefenders ©
// File: /components/dashboard/SupplierRecommendationsPanel.tsx
// Timestamp: 30 March 2026 04:30

type Item = {
  part_id: string
  supplier_id: string
  price: number
  market_avg: number
  diff_percent: number
  supplier_score: number
  finalScore: number
  decision: 'buy_now' | 'good' | 'avoid'
}

function getColour(decision: Item['decision']) {
  if (decision === 'buy_now') return 'text-green-500'
  if (decision === 'avoid') return 'text-red-500'
  return 'text-yellow-400'
}

function getLabel(decision: Item['decision']) {
  if (decision === 'buy_now') return 'BUY NOW'
  if (decision === 'avoid') return 'AVOID'
  return 'GOOD OPTION'
}

export default function SupplierRecommendationsPanel({
  data,
}: {
  data: Item[]
}) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-900 p-4 rounded-2xl">
        <h2 className="text-lg font-semibold mb-4">
          Supplier Recommendations
        </h2>
        <div className="text-sm text-gray-500">
          No recommendations available
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 p-4 rounded-2xl">
      <h2 className="text-lg font-semibold mb-4">
        Supplier Recommendations
      </h2>

      <div className="space-y-3">
        {data.map((item, i) => (
          <div
            key={`${item.part_id}_${i}`}
            className="flex justify-between items-center border-b border-gray-800 pb-2"
          >
            {/* LEFT */}
            <div>
              <div className="text-sm text-gray-300">
                {item.part_id}
              </div>
              <div className="text-xs text-gray-500">
                Supplier: {item.supplier_id}
              </div>
            </div>

            {/* RIGHT */}
            <div className="text-right">
              <div className="text-sm font-semibold">
                ${item.price}
              </div>

              <div className="text-xs text-gray-500">
                Avg: ${item.market_avg} ({item.diff_percent}%)
              </div>

              <div className={`text-xs ${getColour(item.decision)}`}>
                {getLabel(item.decision)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}