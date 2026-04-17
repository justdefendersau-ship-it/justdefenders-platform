/*
Timestamp: 5 March 2026 12:00
File: app/components/FleetFailureHeatmap.tsx

Purpose
-------
Displays a Fleet Failure Heatmap showing the relative failure risk
across major vehicle systems.

This visualisation is commonly used in fleet analytics platforms
and insurance underwriting dashboards.

Each cell represents a system-level failure risk intensity.
*/

"use client"

const systems = [
  { name: "Engine", value: 72 },
  { name: "Transmission", value: 55 },
  { name: "Cooling", value: 38 },
  { name: "Electrical", value: 64 },
  { name: "Fuel", value: 41 },
  { name: "Suspension", value: 33 },
  { name: "Braking", value: 47 }
]

function getColor(value: number) {

  if (value > 65) return "bg-red-500"
  if (value > 50) return "bg-orange-500"
  if (value > 40) return "bg-yellow-400"
  return "bg-green-400"

}

export default function FleetFailureHeatmap() {

  return (

    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

      <h2 className="text-lg font-semibold mb-6">
        Fleet Failure Heatmap
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {systems.map((system) => (

          <div
            key={system.name}
            className={`rounded-lg p-4 text-white font-semibold ${getColor(system.value)}`}
          >

            <div className="text-sm opacity-90">
              {system.name}
            </div>

            <div className="text-2xl mt-1">
              {system.value}
            </div>

          </div>

        ))}

      </div>

    </div>

  )

}