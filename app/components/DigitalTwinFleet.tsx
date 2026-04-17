/*
Timestamp: 5 March 2026 15:10
File: app/components/DigitalTwinFleet.tsx

Purpose
-------
Displays digital twin models for each vehicle.

Shows predicted system health and remaining useful life.

This creates a predictive maintenance view of the fleet.
*/

"use client"

import { useEffect, useState } from "react"

type Twin = {

  vehicleId: string
  engineHealth: number
  drivetrainHealth: number
  coolingHealth: number
  remainingUsefulLife: number
  predictedMaintenanceCost: number

}

export default function DigitalTwinFleet() {

  const [twins, setTwins] = useState<Twin[]>([])

  useEffect(() => {

    async function loadTwins() {

      const res = await fetch("/api/ml/digital-twin")
      const json = await res.json()

      setTwins(json)

    }

    loadTwins()

  }, [])

  if (!twins.length) {
    return <div>Loading digital twin models...</div>
  }

  return (

    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

      <h2 className="text-lg font-semibold mb-6">
        Fleet Digital Twin
      </h2>

      <div className="space-y-4">

        {twins.map((twin) => (

          <div
            key={twin.vehicleId}
            className="border rounded-lg p-4"
          >

            <div className="text-sm text-gray-500 mb-2">
              Vehicle ID
            </div>

            <div className="font-semibold mb-3">
              {twin.vehicleId}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              <div>
                <div className="text-xs text-gray-500">
                  Engine Health
                </div>
                <div className="font-semibold">
                  {twin.engineHealth}%
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500">
                  Drivetrain Health
                </div>
                <div className="font-semibold">
                  {twin.drivetrainHealth}%
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500">
                  Cooling System
                </div>
                <div className="font-semibold">
                  {twin.coolingHealth}%
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500">
                  Remaining Life
                </div>
                <div className="font-semibold">
                  {twin.remainingUsefulLife} yrs
                </div>
              </div>

            </div>

            <div className="mt-3 text-sm text-gray-600">
              Predicted Maintenance Cost: $
              {twin.predictedMaintenanceCost}
            </div>

          </div>

        ))}

      </div>

    </div>

  )

}