"use client"

/*
Vehicle Intelligence Panel
Timestamp: 13 March 2026 18:33
Displays intelligence metrics for vehicle
*/

import { useEffect,useState } from "react"

interface Intelligence {

health_score:number
reliability_score:number
failure_risk:string
maintenance_risk:string

}

export default function VehicleIntelligencePanel({vin}:{vin:string}){

const [intel,setIntel] = useState<Intelligence | null>(null)

useEffect(()=>{

async function load(){

const res = await fetch(`/api/vehicle/${vin}/intelligence`)
const json = await res.json()

setIntel(json)

}

load()

},[vin])

if(!intel){

return <div className="bg-gray-900 p-6 rounded-xl">Loading intelligence...</div>

}

return(

<div className="bg-gray-900 text-white p-6 rounded-xl">

<h2 className="text-xl font-bold mb-4">
Vehicle Intelligence
</h2>

<div className="grid md:grid-cols-4 gap-4">

<div className="bg-gray-800 p-4 rounded">

<div className="text-gray-400 text-sm">
Health Score
</div>

<div className="text-2xl font-bold">
{intel.health_score}
</div>

</div>


<div className="bg-gray-800 p-4 rounded">

<div className="text-gray-400 text-sm">
Reliability Score
</div>

<div className="text-2xl font-bold">
{intel.reliability_score}
</div>

</div>


<div className="bg-gray-800 p-4 rounded">

<div className="text-gray-400 text-sm">
Failure Risk
</div>

<div className="text-2xl font-bold">
{intel.failure_risk}
</div>

</div>


<div className="bg-gray-800 p-4 rounded">

<div className="text-gray-400 text-sm">
Maintenance Risk
</div>

<div className="text-2xl font-bold">
{intel.maintenance_risk}
</div>

</div>

</div>

</div>

)

}