'use client'

// JustDefenders ©
// File: /components/dashboard/FailurePredictions.tsx
// Timestamp: 30 March 2026 01:30

type Prediction = {
  vehicle_id: string
  part_id: string
  mdbf: number
  probability: number
  km_to_failure: number
  risk: 'low' | 'medium' | 'high' | 'critical'
}

function getRiskColour(risk: Prediction['risk']) {
  if (risk === 'critical') return 'text-red-500'
  if (risk === 'high') return 'text-orange-400'
  if (risk === 'medium') return 'text-yellow-400'
  return 'text-green-500'
}

function getRiskLabel(risk: Prediction['risk']) {
  if (risk === 'critical') return 'CRITICAL'
  if (risk === 'high') return 'HIGH'
  if (risk === 'medium') return 'MEDIUM'
  return 'LOW'
}

export default function FailurePredictions({
  data,
}: {
  data: Prediction[]
}) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-900 p-4 rounded-2xl">
        <h2 className="text-lg font-semibold mb-4">
          Failure Predictions
        </h2>
        <div className="text-sm text-gray-500">
          No prediction data available
        </div>
      </div>
    )
  }

  // Sort highest risk first
  const sorted = [...data].sort((a, b) => b.probability - a.probability)

  return (
    <div className="bg-gray-900 p-4 rounded-2xl">
      <h2 className="text-lg font-semibold mb-4">
        Failure Predictions
      </h2>

      <div className="space-y-3">
        {sorted.map((item, i) => (
          <div
            key={`${item.vehicle_id}_${item.part_id}_${i}`}
            className="flex justify-between items-center border-b border-gray-800 pb-2"
          >
            {/* LEFT SIDE */}
            <div>
              <div className="text-sm text-gray-300">
                {item.vehicle_id} / {item.part_id}
              </div>

              <div className="text-xs text-gray-500">
                MDBF: {item.mdbf} km
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="text-right">
              <div className={`text-sm font-semibold ${getRiskColour(item.risk)}`}>
                {item.probability}% ({getRiskLabel(item.risk)})
              </div>

              {/* ✅ UPDATED TO ODOMETER-BASED OUTPUT */}
              <div className="text-xs text-gray-500">
                {item.km_to_failure} km
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}