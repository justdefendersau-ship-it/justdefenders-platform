"use client"

/*
Fleet Health Overview
Timestamp: 13 March 2026 17:02
Displays distribution of fleet health scores
*/

import { useEffect,useState } from "react"

interface FleetHealth {

healthy:number
warning:number
critical:number

}

export default function FleetHealthOverview(){

const [health,setHealth] = useState<FleetHealth | null>(null)

useEffect(()=>{

async function load(){

const res = await fetch("/api/dashboard/fleet-health")
const json = await res.json()

setHealth(json)

}

load()

},[])

if(!health){

return <div className="bg-gray-900 p-6 rounded-xl">Loading fleet health...</div>

}

return(

<div className="bg-gray-900 p-6 rounded-xl">

<h2 className="text-xl font-bold mb-4">
Fleet Health Overview
</h2>

<div className="grid grid-cols-3 gap-4">

<div className="bg-green-700 p-4 rounded-lg text-center">

<div className="text-2xl font-bold">
{health.healthy}
</div>

<div className="text-sm">
Healthy
</div>

</div>

<div className="bg-yellow-600 p-4 rounded-lg text-center">

<div className="text-2xl font-bold">
{health.warning}
</div>

<div className="text-sm">
Warning
</div>

</div>

<div className="bg-red-700 p-4 rounded-lg text-center">

<div className="text-2xl font-bold">
{health.critical}
</div>

<div className="text-sm">
Critical
</div>

</div>

</div>

</div>

)

}