'use client'

// JustDefenders ©
// File: /components/dashboard/PriceBenchmarkPanel.tsx
// Timestamp: 30 March 2026 03:30

type Item = {
  part_id: string
  supplier_id: string
  price: number
  market_avg: number
  diff_percent: number
  position: 'cheapest' | 'mid' | 'expensive'
}

function getColour(position: Item['position']) {
  if (position === 'cheapest') return 'text-green-500'
  if (position === 'expensive') return 'text-red-500'
  return 'text-gray-400'
}

function getLabel(position: Item['position']) {
  if (position === 'cheapest') return 'BEST PRICE'
  if (position === 'expensive') return 'OVERPRICED'
  return 'MARKET'
}

export default function PriceBenchmarkPanel({
  data,
}: {
  data: Item[]
}) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-900 p-4 rounded-2xl">
        <h2 className="text-lg font-semibold mb-4">
          Price Benchmarking
        </h2>
        <div className="text-sm text-gray-500">
          No pricing data available
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 p-4 rounded-2xl">
      <h2 className="text-lg font-semibold mb-4">
        Price Benchmarking
      </h2>

      <div className="space-y-3">
        {data.map((item, i) => (
          <div
            key={`${item.part_id}_${item.supplier_id}_${i}`}
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
              <div className={`text-sm font-semibold ${getColour(item.position)}`}>
                ${item.price}
              </div>

              <div className="text-xs text-gray-500">
                Avg: ${item.market_avg} ({item.diff_percent}%)
              </div>

              <div className={`text-xs ${getColour(item.position)}`}>
                {getLabel(item.position)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}