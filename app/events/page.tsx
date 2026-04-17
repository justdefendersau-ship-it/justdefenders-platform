"use client"

// Timestamp 6 March 2026 17:45
// File: /app/events/page.tsx

import { useEffect, useState } from "react"

export default function EventStreamPage() {

  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {

    const load = async () => {

      const res = await fetch("/api/events")
      const data = await res.json()

      setEvents(data.events)

    }

    load()

  }, [])

  return (

    <div className="p-10 space-y-6">

      <h1 className="text-3xl font-bold">

        Reliability Event Stream

      </h1>

      {events.map((e, i) => (

        <div key={i} className="border-b py-2">

          <div>Type: {e.event_type}</div>
          <div>Entity: {e.entity_id}</div>
          <div>Status: {e.processed ? "Processed" : "Pending"}</div>

        </div>

      ))}

    </div>

  )

}