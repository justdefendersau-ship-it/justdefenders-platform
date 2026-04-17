"use client"

// Timestamp: 13 March 2026 18:50
// Defender Intelligence Feed

import { useEffect, useState } from "react"

export default function IntelligenceFeed() {

  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {

    async function loadFeed() {

      const res = await fetch("/api/intelligence/feed")
      const data = await res.json()

      setEvents(data.events || [])

    }

    loadFeed()

  }, [])

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold mb-4">
        Defender Intelligence Feed
      </h2>

      <div className="space-y-3">

        {events.map((e, i) => (

          <div key={i} className="border-b pb-2">

            <div className="text-sm">
              {e.message}
            </div>

            <div className="text-xs text-gray-500">
              {new Date(e.time).toLocaleString()}
            </div>

          </div>

        ))}

      </div>

    </div>

  )

}