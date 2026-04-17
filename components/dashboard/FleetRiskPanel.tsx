'use client'

// JustDefenders ©
// File: /components/dashboard/FleetRiskPanel.tsx
// Timestamp: 30 March 2026 02:30

function getColour(risk: string) {
  if (risk === 'critical') return 'text-red-500'
  if (risk === 'high') return 'text-orange-400'
  if (risk === 'medium') return 'text-yellow-400'
  return 'text-green-500'
}

export default function FleetRiskPanel({ data }: any) {
  return (
    <div className="bg-gray-900 p-4 rounded-2xl">
      <h2 className="text-lg font-semibold mb-4">
        Fleet Risk Ranking
      </h2>

      <div className="space-y-3">
        {data.map((v: any, i: number) => (
          <div
            key={i}
            className="flex justify-between items-center border-b border-gray-800 pb-2"
          >
            <div className="text-sm text-gray-300">
              #{i + 1} {v.vehicle_id}
            </div>

            <div className={`font-semibold ${getColour(v.risk)}`}>
              {v.risk_score} ({v.risk})
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}