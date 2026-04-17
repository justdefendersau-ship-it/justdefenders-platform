"use client"

// Timestamp 7 March 2026 02:05
// File: /app/vehicle-twin/page.tsx

import { useState } from "react"

export default function VehicleTwin(){

 const [vin,setVin] = useState("")
 const [twin,setTwin] = useState<any>(null)

 async function loadTwin(){

  const res =
   await fetch(`/api/ai/vehicle-twin?vin=${vin}`)

  const data = await res.json()

  setTwin(data)

 }

 return(

 <div className="p-10 space-y-6">

  <h1 className="text-3xl font-bold">
   Vehicle Digital Twin
  </h1>

  <div className="flex space-x-2">

   <input
   value={vin}
   onChange={(e)=>setVin(e.target.value)}
   placeholder="Enter VIN"
   className="border p-3 w-full"
   />

   <button
   onClick={loadTwin}
   className="bg-black text-white px-4 py-2 rounded"
   >
   Load Twin
   </button>

  </div>

  {twin && (

   <div className="border p-6 space-y-2">

    <div>Health Score: {twin.health_score}</div>
    <div>Failure Risk: {twin.predicted_failure_risk}</div>
    <div>Maintenance Risk: {twin.maintenance_risk}</div>
    <div>Environment Risk: {twin.environment_risk}</div>

   </div>

  )}

 </div>

 )

}