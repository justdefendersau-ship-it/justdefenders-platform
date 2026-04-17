// Timestamp: 11 March 2026 18:43
// Vehicle Health Dashboard
// File: platform/app/member/vehicles/[id]/page.tsx

"use client"

import { useEffect,useState } from "react"
import { useParams } from "next/navigation"

export default function VehicleHealth() {

 const params = useParams()
 const vehicleId = params.id

 const [vehicle,setVehicle] = useState<any>(null)
 const [reliability,setReliability] = useState<any>(null)
 const [maintenance,setMaintenance] = useState<any[]>([])
 const [fuel,setFuel] = useState<any[]>([])
 const [issues,setIssues] = useState<any[]>([])
 const [knowledge,setKnowledge] = useState<any[]>([])

 useEffect(()=>{

  fetch(`/api/member/vehicle/${vehicleId}`)
   .then(res=>res.json())
   .then(data=>setVehicle(data))

  fetch(`/api/member/vehicle/${vehicleId}/reliability`)
   .then(res=>res.json())
   .then(data=>setReliability(data))

  fetch(`/api/member/vehicle/${vehicleId}/maintenance`)
   .then(res=>res.json())
   .then(data=>setMaintenance(data))

  fetch(`/api/member/vehicle/${vehicleId}/fuel`)
   .then(res=>res.json())
   .then(data=>setFuel(data))

  fetch(`/api/member/vehicle/${vehicleId}/issues`)
   .then(res=>res.json())
   .then(data=>setIssues(data))

  fetch(`/api/member/vehicle/${vehicleId}/knowledge`)
   .then(res=>res.json())
   .then(data=>setKnowledge(data))

 },[vehicleId])

 return (

  <div className="p-8">


   {/* VEHICLE HEADER */}

   <div className="bg-gray-900 text-white rounded-lg p-6 mb-6">

    <h1 className="text-3xl font-bold">
     {vehicle?.year} {vehicle?.model}
    </h1>

    <p className="text-gray-300">
     Engine: {vehicle?.engine}
    </p>

    <p className="text-gray-400 mt-2">
     VIN: {vehicle?.vin}
    </p>

   </div>



   {/* VEHICLE HEALTH METRICS */}

   <div className="grid grid-cols-3 gap-6 mb-6">

    <div className="bg-white text-gray-900 p-6 rounded shadow">

     <h2 className="font-semibold mb-2">
      Reliability Score
     </h2>

     <p className="text-3xl font-bold">
      {reliability?.reliability_score}
     </p>

    </div>


    <div className="bg-white text-gray-900 p-6 rounded shadow">

     <h2 className="font-semibold mb-2">
      Maintenance Records
     </h2>

     <p className="text-3xl font-bold">
      {maintenance.length}
     </p>

    </div>


    <div className="bg-white text-gray-900 p-6 rounded shadow">

     <h2 className="font-semibold mb-2">
      Fuel Logs
     </h2>

     <p className="text-3xl font-bold">
      {fuel.length}
     </p>

    </div>

   </div>



   {/* KNOWN ISSUES PANEL */}

   <div className="bg-white text-gray-900 p-6 rounded shadow mb-6">

    <h2 className="text-xl font-semibold mb-4">
     Known Issues For Your Defender
    </h2>

    {issues.length === 0 && (
     <p>No common issues recorded for this vehicle.</p>
    )}

    {issues.map((issue)=>(
     <div key={issue.id} className="mb-3">

      <p className="font-semibold">
       ⚠ {issue.component}
      </p>

      <p className="text-sm text-gray-600">
       Typical failure around {issue.failure_mileage} km
      </p>

     </div>
    ))}

   </div>



   {/* REPAIR KNOWLEDGE PANEL */}

   <div className="bg-white text-gray-900 p-6 rounded shadow">

    <h2 className="text-xl font-semibold mb-4">
     Repair Knowledge
    </h2>

    {knowledge.map((article)=>(
     <div key={article.id} className="mb-4">

      <p className="font-semibold">
       {article.title}
      </p>

      <p className="text-sm text-gray-600">
       Source: {article.source}
      </p>

      <a
       href={article.url}
       className="text-blue-600 text-sm"
      >
       View Guide
      </a>

     </div>
    ))}

   </div>


  </div>

 )

}