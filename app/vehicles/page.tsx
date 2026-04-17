// ------------------------------------------------------
// File: app/vehicles/page.tsx
// Timestamp: 18 March 2026 09:35
// JustDefenders ©
//
// Vehicles Overview Page
// ------------------------------------------------------

"use client"

import Link from "next/link"

export default function VehiclesPage() {

  return (

    <div className="p-6 text-white">

      <h1 className="text-2xl font-bold mb-4">
        My Vehicles
      </h1>

      <p className="mb-6 text-gray-400">
        Select a vehicle to view its digital twin.
      </p>

      <div className="space-y-3">

        {/* Example vehicle (replace later with real data) */}
        <Link href="/vehicles/demo-vin">
          <div className="p-4 bg-zinc-900 rounded-lg hover:bg-zinc-800 cursor-pointer">
            Defender 110 (Demo Vehicle)
          </div>
        </Link>

      </div>

    </div>

  )

}