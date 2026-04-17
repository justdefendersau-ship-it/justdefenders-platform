"use client"

/*
Vehicle Health Score Panel
Timestamp: 14 March 2026 02:08
Displays calculated vehicle health
*/

import { useEffect,useState } from "react"

export default function VehicleHealthScore({ vin }:{ vin:string }){

const [health,setHealth] = useState<any>(null)

useEffect(()=>{

async function load(){

const res = await fetch(`/api/vehicle-health/${vin}`)
const json = await res.json()

setHealth(json)

}

load()

},[vin])

if(!health){

return(

<div className="bg-gray-900 p-6 rounded-xl">
Loading vehicle health...
</div>

)

}

return(

<div className="bg-gray-900 p-6 rounded-xl">

<h2 className="text-xl font-bold mb-4">
Vehicle Health Score
</h2>

<div className="flex items-center gap-6">

<div className="text-5xl font-bold">
{health.health_score}
</div>

<div>

<div className="text-sm text-gray-400">
Status
</div>

<div className="text-lg font-bold">
{health.status}
</div>

</div>

</div>

</div>

)

}