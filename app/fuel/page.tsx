// Timestamp: 11 March 2026 18:05
// Fuel Logs and Analytics Page

"use client"

import { useEffect,useState } from "react"

export default function FuelPage(){

 const [logs,setLogs] = useState<any[]>([])
 const [vehicles,setVehicles] = useState<any[]>([])

 const [vehicleId,setVehicleId] = useState("")
 const [litres,setLitres] = useState("")
 const [cost,setCost] = useState("")
 const [odometer,setOdometer] = useState("")

 async function loadData(){

  const r = await fetch("/api/fuel")
  const data = await r.json()

  setLogs(data || [])

  const v = await fetch("/api/member/vehicles")
  const vehiclesData = await v.json()

  setVehicles(vehiclesData || [])

 }

 useEffect(()=>{

  loadData()

 },[])

 async function addFuel(){

  await fetch("/api/fuel",{

   method:"POST",

   headers:{
    "Content-Type":"application/json"
   },

   body:JSON.stringify({

    vehicle_id:vehicleId,
    litres,
    total_cost:cost,
    odometer

   })

  })

  setLitres("")
  setCost("")
  setOdometer("")

  loadData()

 }

 return(

  <div>

   {/* Header */}

   <div className="bg-gray-300 p-4 rounded mb-6">

    <h1 className="text-xl font-bold">
     Fuel Logs
    </h1>

   </div>


   {/* Add Fuel Log */}

   <div className="bg-white p-6 rounded shadow mb-6">

    <h2 className="font-bold mb-4">
     Add Fuel Entry
    </h2>

    <div className="grid grid-cols-4 gap-4">

     <select
      className="border p-2"
      value={vehicleId}
      onChange={(e)=>setVehicleId(e.target.value)}
     >

      <option value="">Select Vehicle</option>

      {vehicles.map(v=>(
       <option key={v.id} value={v.id}>
        {v.year} {v.model}
       </option>
      ))}

     </select>

     <input
      placeholder="Litres"
      className="border p-2"
      value={litres}
      onChange={(e)=>setLitres(e.target.value)}
     />

     <input
      placeholder="Total Cost"
      className="border p-2"
      value={cost}
      onChange={(e)=>setCost(e.target.value)}
     />

     <input
      placeholder="Odometer"
      className="border p-2"
      value={odometer}
      onChange={(e)=>setOdometer(e.target.value)}
     />

    </div>

    <button
     onClick={addFuel}
     className="bg-gray-900 text-white px-4 py-2 rounded mt-4"
    >
     Add Fuel Entry
    </button>

   </div>


   {/* Fuel Table */}

   <div className="bg-white rounded shadow">

    <div className="grid grid-cols-4 p-4 border-b font-semibold">

     <div>Date</div>
     <div>Litres</div>
     <div>Total Cost</div>
     <div>Odometer</div>

    </div>

    {logs.map(l=>(
     <div
      key={l.id}
      className="grid grid-cols-4 p-4 border-b text-sm"
     >

      <div>{l.date}</div>

      <div>{l.litres}</div>

      <div>${l.total_cost}</div>

      <div>{l.odometer}</div>

     </div>
    ))}

   </div>

  </div>

 )

}