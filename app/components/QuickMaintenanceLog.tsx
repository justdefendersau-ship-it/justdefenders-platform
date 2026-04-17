"use client"

/*
Dashboard Quick Maintenance Log
Timestamp: 13 March 2026 22:48
Vehicle selector + auto date
*/

import { useState } from "react"
import VehicleSelector from "@/app/components/VehicleSelector"

export default function QuickMaintenanceLog(){

const today = new Date().toISOString().split("T")[0]

const [vin,setVin] = useState("")
const [component,setComponent] = useState("")
const [description,setDescription] = useState("")
const [date,setDate] = useState(today)
const [message,setMessage] = useState("")

async function saveMaintenance(){

const res = await fetch("/api/maintenance/log",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
vin,
component,
description,
date
})
})

if(res.ok){

setMessage("Maintenance logged")
setComponent("")
setDescription("")

}else{

setMessage("Error saving record")

}

}

return(

<div className="bg-gray-900 p-6 rounded-xl space-y-4">

<h2 className="text-xl font-bold">
Log Maintenance
</h2>

<VehicleSelector
value={vin}
onChange={setVin}
/>

<input
type="text"
placeholder="Component"
className="w-full bg-gray-800 p-3 rounded"
value={component}
onChange={(e)=>setComponent(e.target.value)}
/>

<textarea
placeholder="Description"
className="w-full bg-gray-800 p-3 rounded"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<label className="text-sm text-gray-400">
Service Date
</label>

<input
type="date"
className="w-full bg-gray-800 p-3 rounded"
value={date}
onChange={(e)=>setDate(e.target.value)}
/>

<button
onClick={saveMaintenance}
disabled={!vin}
className="bg-blue-600 px-5 py-2 rounded-lg font-semibold"
>
Save
</button>

{message && <p className="text-sm text-gray-400">{message}</p>}

</div>

)

}