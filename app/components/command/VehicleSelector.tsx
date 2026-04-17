// VehicleSelector.tsx
// Timestamp: 9 March 2026 18:52
// Commentary:
// Vehicle selector for Command Centre context switching.

"use client"

import { useCommandCenter } from "@/app/analytics/command-center/state/commandCenterStore"

export default function VehicleSelector(){

 const { selectedVehicle, setSelectedVehicle } = useCommandCenter()

 const vehicles = [
  "Defender 110 Puma",
  "Defender 90 TD5",
  "Defender 130 Expedition"
 ]

 return (

  <div className="flex items-center gap-3">

   <label className="text-sm font-medium">
    Vehicle
   </label>

   <select
    value={selectedVehicle ?? ""}
    onChange={(e)=>setSelectedVehicle(e.target.value)}
    className="border rounded px-3 py-1 text-sm"
   >

    <option value="">Select Vehicle</option>

    {vehicles.map(v=>(
     <option key={v} value={v}>
      {v}
     </option>
    ))}

   </select>

  </div>

 )

}