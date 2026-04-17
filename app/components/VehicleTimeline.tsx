// ------------------------------------------------------
// File: app/components/VehicleTimeline.tsx
// Timestamp: 18 March 2026 00:28
// JustDefenders ©
//
// Vehicle Service + Reliability + Prediction Timeline
// ------------------------------------------------------

"use client"

import { useEffect, useState } from "react"

type TimelineEvent = {
  date: string
  type: string
  title: string
  description: string
}

const colors: Record<string,string> = {
  fuel: "border-blue-500",
  maintenance: "border-green-500",
  failure: "border-red-500",
  health: "border-yellow-500",
  prediction: "border-purple-500"
}

export default function VehicleTimeline({ vin }: { vin: string }) {

  const [events, setEvents] = useState<TimelineEvent[]>([])

  useEffect(() => {

    async function loadTimeline() {

      const res = await fetch(`/api/vehicle-timeline/${vin}`)
      const data = await res.json()

      setEvents(data)

    }

    loadTimeline()

  }, [vin])

  return (

    <div className="bg-neutral-900 rounded-lg p-6">

      <h2 className="text-lg font-semibold text-white mb-6">
        Vehicle Reliability Timeline
      </h2>

      <div className="space-y-4">

        {events.map((event, index) => (

          <div
            key={index}
            className={`border-l-4 pl-4 py-2 ${colors[event.type] || "border-gray-600"}`}
          >

            <div className="text-xs text-gray-400">
              {new Date(event.date).toLocaleDateString()}
            </div>

            <div className="text-white font-medium">
              {event.title}
            </div>

            <div className="text-gray-400 text-sm">
              {event.description}
            </div>

          </div>

        ))}

      </div>

    </div>

  )

}