"use client"

/*
VIN Reliability Score Panel
Timestamp: 13 March 2026 14:41
Displays reliability score vs fleet benchmarks
*/

import { useEffect, useState } from "react"

interface ScoreData {

score:number
percentile:number
model_avg:number
fleet_avg:number

}

export default function VinReliabilityScore({vin}:{vin:string}){

const [data,setData] = useState<ScoreData | null>(null)

useEffect(()=>{

async function load(){

const res = await fetch(`/api/vehicle/reliability-score?vin=${vin}`)
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
VIN Reliability Score
</h2>

<div className="flex items-center justify-between">

<div>

<div className="text-5xl font-bold text-green-400">
{data.score}
</div>

<div className="text-sm text-gray-400">
Score out of 100
</div>

</div>

<div className="text-right">

<div className="text-lg">
Top {data.percentile}%
</div>

<div className="text-sm text-gray-400">
of Defender fleet
</div>

</div>

</div>

<div className="mt-6 space-y-2 text-sm">

<div className="flex justify-between">
<span>Model Average</span>
<span>{data.model_avg}</span>
</div>

<div className="flex justify-between">
<span>Fleet Average</span>
<span>{data.fleet_avg}</span>
</div>

</div>

</div>

)

}