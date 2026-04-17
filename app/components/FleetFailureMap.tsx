"use client"

// Timestamp: 13 March 2026 17:00
// Fleet Failure Map

import { useEffect, useState } from "react"

interface FailureEvent {
  lat: number
  lng: number
  component: string
}

export default function FleetFailureMap() {

  const [events, setEvents] = useState<FailureEvent[]>([])

  useEffect(() => {

    async function loadEvents() {

      const res = await fetch("/api/failures/map")
      const data = await res.json()

      setEvents(data.events || [])

    }

    loadEvents()

  }, [])

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold mb-4">
        Fleet Failure Map
      </h2>

      <div className="space-y-2">

        {events.map((e, i) => (

          <div key={i} className="border rounded p-3">

            <strong>{e.component}</strong>

            <div className="text-sm text-gray-500">
              {e.lat}, {e.lng}
            </div>

          </div>

        ))}

      </div>

    </div>

  )
}