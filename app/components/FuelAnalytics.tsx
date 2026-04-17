"use client"

/*
Fuel Analytics Panel
Timestamp: 14 March 2026 01:02
Displays expedition fuel intelligence
*/

import { useEffect,useState } from "react"

export default function FuelAnalytics({ vin }:{ vin:string }){

const [stats,setStats] = useState<any>(null)

useEffect(()=>{

async function load(){

const res = await fetch(`/api/fuel/analytics/${vin}`)
const json = await res.json()

setStats(json)

}

load()

},[vin])

if(!stats){

return(

<div className="bg-gray-900 p-6 rounded-xl">
Loading analytics...
</div>

)

}

return(

<div className="bg-gray-900 p-6 rounded-xl">

<h2 className="text-xl font-bold mb-4">
Fuel Analytics
</h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-4">

<div className="bg-gray-800 p-4 rounded">
<div className="text-sm text-gray-400">
Average Economy
</div>
<div className="text-2xl font-bold">
{stats.avg_km_per_l} km/L
</div>
</div>

<div className="bg-gray-800 p-4 rounded">
<div className="text-sm text-gray-400">
Best Economy
</div>
<div className="text-2xl font-bold">
{stats.best_km_per_l} km/L
</div>
</div>

<div className="bg-gray-800 p-4 rounded">
<div className="text-sm text-gray-400">
Worst Economy
</div>
<div className="text-2xl font-bold">
{stats.worst_km_per_l} km/L
</div>
</div>

<div className="bg-gray-800 p-4 rounded">
<div className="text-sm text-gray-400">
Estimated Range
</div>
<div className="text-2xl font-bold">
{stats.range_estimate} km
</div>
</div>

</div>

</div>

)

}