"use client"

/*
Fleet Intelligence Comparison Panel
Timestamp: 13 March 2026 15:34
Compares vehicle reliability against Defender fleet benchmarks
*/

import { useEffect, useState } from "react"

interface FleetData {

vehicle_score:number
model_average:number
fleet_average:number
percentile:number

}

export default function FleetComparisonPanel({vin}:{vin:string}){

const [data,setData] = useState<FleetData | null>(null)

useEffect(()=>{

async function load(){

const res = await fetch(`/api/vehicle/fleet-comparison?vin=${vin}`)
const json = await res.json()

setData(json)

}

load()

},[vin])

if(!data){

return <div className="bg-gray-900 p-6 rounded-xl">Loading...</div>

}

return(

<div className="bg-gray-900 p-6 rounded-xl">

<h2 className="text-xl font-bold mb-4">
Fleet Intelligence
</h2>

<div className="space-y-3 text-sm">

<div className="flex justify-between">
<span>Your Defender</span>
<span className="font-semibold">{data.vehicle_score}</span>
</div>

<div className="flex justify-between">
<span>Model Average</span>
<span>{data.model_average}</span>
</div>

<div className="flex justify-between">
<span>Fleet Average</span>
<span>{data.fleet_average}</span>
</div>

<div className="flex justify-between pt-3 border-t border-gray-700">
<span>Fleet Percentile</span>
<span className="font-semibold">Top {data.percentile}%</span>
</div>

</div>

</div>

)

}