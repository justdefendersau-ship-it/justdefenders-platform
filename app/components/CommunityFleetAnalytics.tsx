/*
Timestamp: 5 March 2026 12:10
File: app/components/CommunityFleetAnalytics.tsx

Purpose
-------
Displays aggregated fleet data collected
from all members of the organization.

This enables community-level analytics
for improved predictive accuracy.
*/

"use client"

import { useEffect, useState } from "react"

type Data = {

  totalVehicles: number
  totalMembers: number
  averageVehicleAge: number
  estimatedMaintenanceCost: number

}

export default function CommunityFleetAnalytics() {

  const [data, setData] = useState<Data | null>(null)

  useEffect(() => {

    async function load() {

      const res = await fetch("/api/platform/community-analytics")
      const json = await res.json()

      setData(json)

    }

    load()

  }, [])

  if (!data) {
    return <div>Loading community analytics...</div>
  }

  return (

    <div className="bg-white border rounded-xl p-6 shadow-sm">

      <h2 className="text-lg font-semibold mb-4">
        Community Fleet Analytics
      </h2>

      <div className="grid grid-cols-4 gap-6">

        <div>
          <div className="text-sm text-gray-500">
            Members
          </div>
          <div className="text-xl font-semibold">
            {data.totalMembers}
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500">
            Vehicles
          </div>
          <div className="text-xl font-semibold">
            {data.totalVehicles}
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500">
            Avg Vehicle Age
          </div>
          <div className="text-xl font-semibold">
            {data.averageVehicleAge}
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500">
            Fleet Maintenance Cost
          </div>
          <div className="text-xl font-semibold">
            ${data.estimatedMaintenanceCost}
          </div>
        </div>

      </div>

    </div>

  )

}