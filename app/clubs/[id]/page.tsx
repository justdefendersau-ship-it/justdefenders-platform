"use client"

// Timestamp: 13 March 2026 21:05
// Club Profile Page

import { useEffect, useState } from "react"

export default function ClubPage({ params }: any) {

  const [club, setClub] = useState<any>(null)
  const [vehicles, setVehicles] = useState<any[]>([])

  useEffect(() => {

    async function load() {

      const res = await fetch(`/api/clubs/${params.id}`)
      const data = await res.json()

      setClub(data.club)
      setVehicles(data.vehicles || [])

    }

    load()

  }, [params.id])

  if (!club) return null

  return (

    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-4">
        {club.name}
      </h1>

      <p className="text-gray-600 mb-6">
        {club.region} Defender Club
      </p>

      <h2 className="text-xl font-semibold mb-3">
        Club Vehicles
      </h2>

      <div className="space-y-3">

        {vehicles.map((v, i) => (

          <div key={i} className="border rounded p-3">

            <strong>{v.nickname || v.model}</strong>

            <div className="text-sm text-gray-500">
              {v.engine}
            </div>

          </div>

        ))}

      </div>

    </div>

  )

}