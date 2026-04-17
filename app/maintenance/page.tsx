// Timestamp: 11 March 2026 17:30
// Maintenance Records Page
// Displays and adds service records

"use client"

import { useEffect,useState } from "react"

export default function MaintenancePage(){

 const [records,setRecords] = useState<any[]>([])
 const [vehicles,setVehicles] = useState<any[]>([])

 const [vehicleId,setVehicleId] = useState("")
 const [description,setDescription] = useState("")
 const [cost,setCost] = useState("")

 async function loadData(){

  const r = await fetch("/api/maintenance")
  const data = await r.json()

  setRecords(data || [])

  const v = await fetch("/api/member/vehicles")
  const vehiclesData = await v.json()

  setVehicles(vehiclesData || [])

 }

 useEffect(()=>{

  loadData()

 },[])

 async function addRecord(){

  await fetch("/api/maintenance",{

   method:"POST",

   headers:{
    "Content-Type":"application/json"
   },

   body:JSON.stringify({

    vehicle_id:vehicleId,
    description,
    cost

   })

  })

  setDescription("")
  setCost("")

  loadData()

 }

 return(

  <div>

   {/* Header */}

   <div className="bg-gray-300 p-4 rounded mb-6">

    <h1 className="text-xl font-bold">
     Maintenance Records
    </h1>

   </div>


   {/* Add Record */}

   <div className="bg-white p-6 rounded shadow mb-6">

    <h2 className="font-bold mb-4">
     Add Service Record
    </h2>

    <div className="grid grid-cols-3 gap-4">

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
      placeholder="Description"
      className="border p-2"
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
     />

     <input
      placeholder="Cost"
      className="border p-2"
      value={cost}
      onChange={(e)=>setCost(e.target.value)}
     />

    </div>

    <button
     onClick={addRecord}
     className="bg-gray-900 text-white px-4 py-2 rounded mt-4"
    >
     Add Record
    </button>

   </div>


   {/* Maintenance Table */}

   <div className="bg-white rounded shadow">

    <div className="grid grid-cols-4 p-4 border-b font-semibold">

     <div>Date</div>
     <div>Description</div>
     <div>Cost</div>
     <div>Vehicle</div>

    </div>

    {records.map(r=>(
     <div
      key={r.id}
      className="grid grid-cols-4 p-4 border-b text-sm"
     >

      <div>{r.date}</div>

      <div>{r.description}</div>

      <div>${r.cost}</div>

      <div>{r.vehicle_id}</div>

     </div>
    ))}

   </div>

  </div>

 )

}