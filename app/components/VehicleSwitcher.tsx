"use client"

/*
=====================================================
VEHICLE SWITCHER (SAFE VERSION)
Timestamp: 1 March 2026 12:30

Fixes:
✔ Removes JSX.Element typing
✔ Guards against undefined context
✔ Eliminates TS namespace errors
=====================================================
*/

import { useEffect, useState } from "react"
import { useVehicle } from "@/lib/vehicleContext"

export default function VehicleSwitcher() {

  const { vehicleId, setVehicleId } = useVehicle()
  const [vehicles, setVehicles] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/vehicles")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setVehicles(data)
        } else {
          setVehicles([])
        }
      })
      .catch(() => setVehicles([]))
  }, [])

  return (
    <select
      value={vehicleId ?? ""}
      onChange={(e) => setVehicleId(e.target.value)}
      aria-label="Select vehicle"
    >
      <option value="">Select Vehicle</option>

      {vehicles.map((v) => (
        <option key={v.id} value={v.id}>
          {v.name}
        </option>
      ))}

    </select>
  )
}