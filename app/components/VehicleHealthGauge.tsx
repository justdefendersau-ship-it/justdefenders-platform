"use client"

/*
Vehicle Health Score Gauge
Timestamp: 13 March 2026 15:02
Displays overall vehicle health score
*/

import { useEffect, useState } from "react"

interface HealthData {

score:number
risk:string

}

export default function VehicleHealthGauge({vin}:{vin:string}){

const [data,setData] = useState<HealthData | null>(null)

useEffect(()=>{

async function load(){

const res = await fetch(`/api/vehicle/health-score?vin=${vin}`)
const json = await res.json()

setData(json)

}

load()

},[vin])

if(!data){

return <div className="bg-gray-900 p-6 rounded-xl">Loading...</div>

}

function color(){

if(data.score >= 80) return "text-green-400"
if(data.score >= 60) return "text-yellow-400"
return "text-red-500"

}

return(

<div className="bg-gray-900 p-8 rounded-xl text-center">

<h2 className="text-xl font-bold mb-4">
Vehicle Health
</h2>

<div className={`text-6xl font-bold ${color()}`}>
{data.score}
</div>

<div className="text-gray-400 mb-4">
Score out of 100
</div>

<div className="text-lg font-semibold">
{data.risk}
</div>

</div>

)

}