/*
JustDefenders ©
Fleet Map Demo Page
Demonstrates Fleet Intelligence Map with multiple Defender vehicles

File: app/fleet-map-demo/page.tsx
Timestamp: 15 March 2026 14:00
*/

"use client"

import FleetMap from "@/app/components/FleetMap"

export default function FleetMapDemoPage() {

  const vehicles = [
    {
      id: "defender-1",
      route: [
        { lat: -33.865, lng: 151.209 },
        { lat: -33.870, lng: 151.215 },
        { lat: -33.875, lng: 151.222 },
        { lat: -33.880, lng: 151.230 }
      ]
    },
    {
      id: "defender-2",
      route: [
        { lat: -33.840, lng: 151.200 },
        { lat: -33.845, lng: 151.210 },
        { lat: -33.850, lng: 151.220 },
        { lat: -33.860, lng: 151.235 }
      ]
    },
    {
      id: "defender-3",
      route: [
        { lat: -33.900, lng: 151.210 },
        { lat: -33.905, lng: 151.220 },
        { lat: -33.910, lng: 151.230 },
        { lat: -33.920, lng: 151.245 }
      ]
    }
  ]

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold text-white">
        Fleet Intelligence Map Demo
      </h1>

      <p className="text-neutral-400">
        Multiple Defender vehicles moving simultaneously.
      </p>

      <FleetMap vehicles={vehicles} />

    </div>
  )
}