"use client"

/*
Dashboard Quick Fuel Log
Timestamp: 13 March 2026 22:48
Vehicle selector + auto date
*/

import { useState } from "react"
import VehicleSelector from "@/app/components/VehicleSelector"

export default function QuickFuelLog(){

const today = new Date().toISOString().split("T")[0]

const [vin,setVin] = useState("")
const [litres,setLitres] = useState("")
const [cost,setCost] = useState("")
const [odometer,setOdometer] = useState("")
const [date,setDate] = useState(today)
const [message,setMessage] = useState("")

async function saveFuel(){

const res = await fetch("/api/fuel/log",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
vin,
litres,
cost,
odometer,
date
})
})

if(res.ok){

setMessage("Fuel entry saved")
setLitres("")
setCost("")
setOdometer("")

}else{

setMessage("Error saving fuel entry")

}

}

return(

<div className="bg-gray-900 p-6 rounded-xl space-y-4">

<h2 className="text-xl font-bold">
Log Fuel
</h2>

<VehicleSelector
value={vin}
onChange={setVin}
/>

<input
type="number"
placeholder="Litres"
className="w-full bg-gray-800 p-3 rounded"
value={litres}
onChange={(e)=>setLitres(e.target.value)}
/>

<input
type="number"
placeholder="Cost"
className="w-full bg-gray-800 p-3 rounded"
value={cost}
onChange={(e)=>setCost(e.target.value)}
/>

<input
type="number"
placeholder="Odometer"
className="w-full bg-gray-800 p-3 rounded"
value={odometer}
onChange={(e)=>setOdometer(e.target.value)}
/>

<label className="text-sm text-gray-400">
Date
</label>

<input
type="date"
className="w-full bg-gray-800 p-3 rounded"
value={date}
onChange={(e)=>setDate(e.target.value)}
/>

<button
onClick={saveFuel}
disabled={!vin}
className="bg-green-600 px-5 py-2 rounded-lg font-semibold"
>
Save
</button>

{message && <p className="text-sm text-gray-400">{message}</p>}

</div>

)

}