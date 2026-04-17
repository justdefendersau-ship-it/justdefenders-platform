"use client"

/*
Maintenance Logging Page
Vehicle Selection Auto-Fill Integration
Timestamp: 13 March 2026 22:36
Replaces manual VIN input with VehicleSelector
*/

import { useState } from "react"
import VehicleSelector from "@/app/components/VehicleSelector"

export default function MaintenancePage(){

const [vin,setVin] = useState("")
const [component,setComponent] = useState("")
const [description,setDescription] = useState("")
const [serviceDate,setServiceDate] = useState("")
const [saving,setSaving] = useState(false)
const [message,setMessage] = useState("")

async function saveMaintenance(){

setSaving(true)

const res = await fetch("/api/maintenance/log",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
vin,
component,
description,
serviceDate
})
})

if(res.ok){

setMessage("Maintenance record saved")

setComponent("")
setDescription("")
setServiceDate("")

}else{

setMessage("Error saving maintenance record")

}

setSaving(false)

}

return(

<div className="max-w-2xl mx-auto space-y-6">

<h1 className="text-2xl font-bold">
Maintenance Log
</h1>

<div className="bg-gray-900 p-6 rounded-xl space-y-4">

<label className="block text-sm text-gray-400">
Vehicle
</label>

<VehicleSelector
value={vin}
onChange={setVin}
/>

<label className="block text-sm text-gray-400">
Component
</label>

<input
type="text"
className="w-full bg-gray-800 p-3 rounded text-white"
value={component}
onChange={(e)=>setComponent(e.target.value)}
placeholder="Example: Oil Filter"
/>

<label className="block text-sm text-gray-400">
Description
</label>

<textarea
className="w-full bg-gray-800 p-3 rounded text-white"
value={description}
onChange={(e)=>setDescription(e.target.value)}
placeholder="Service details"
/>

<label className="block text-sm text-gray-400">
Service Date
</label>

<input
type="date"
className="w-full bg-gray-800 p-3 rounded text-white"
value={serviceDate}
onChange={(e)=>setServiceDate(e.target.value)}
/>

<button
onClick={saveMaintenance}
disabled={saving || !vin}
className="bg-blue-600 px-6 py-3 rounded-lg font-semibold"
>

{saving ? "Saving..." : "Save Maintenance Record"}

</button>

{message && (

<p className="text-sm text-gray-400">
{message}
</p>

)}

</div>

</div>

)

}