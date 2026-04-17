"use client"

// Timestamp 6 March 2026 17:15
// File: /app/network/page.tsx

import { useEffect, useState } from "react"

export default function NetworkDashboard() {

  const [stats, setStats] = useState<any>(null)

  useEffect(() => {

    fetch("/api/network/stats")
      .then(res => res.json())
      .then(setStats)

  }, [])

  if (!stats) {

    return <div className="p-10">Loading network stats...</div>

  }

  return (

    <div className="p-10 space-y-6">

      <h1 className="text-3xl font-bold">

        Defender Reliability Network

      </h1>

      <div>

        Fleets Connected: {stats.fleets_connected}

      </div>

      <div>

        Vehicles in Network: {stats.vehicles_in_network}

      </div>

      <div>

        Reliability Events: {stats.reliability_events}

      </div>

    </div>

  )

}