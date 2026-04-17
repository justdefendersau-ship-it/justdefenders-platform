"use client"

/*
Failure Prediction Graph
Timestamp: 13 March 2026 14:22
Displays predicted failure probability vs mileage
*/

import { useEffect, useState } from "react"

interface PredictionPoint {
  mileage:number
  probability:number
}

export default function FailurePredictionGraph({vin}:{vin:string}){

const [data,setData] = useState<PredictionPoint[]>([])

useEffect(()=>{

async function load(){

const res = await fetch(`/api/vehicle/failure-predictions?vin=${vin}`)
const json = await res.json()

setData(json)

}

load()

},[vin])

return(

<div className="bg-gray-900 p-6 rounded-xl">

<h2 className="text-xl font-bold mb-4">
Failure Prediction Curve
</h2>

<div className="space-y-2">

{data.map((p,i)=>(

<div key={i} className="flex items-center">

<div className="w-24 text-sm text-gray-400">
{p.mileage} km
</div>

<div className="flex-1 bg-gray-700 h-4 rounded">

<div
className="bg-red-500 h-4 rounded"
style={{width:`${p.probability*100}%`}}
/>

</div>

<div className="w-16 text-right text-sm">
{(p.probability*100).toFixed(0)}%
</div>

</div>

))}

</div>

</div>

)

}