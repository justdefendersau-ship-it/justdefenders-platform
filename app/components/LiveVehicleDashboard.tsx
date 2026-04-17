"use client"

/*
Live Vehicle Dashboard
Timestamp: 14 March 2026 02:55
Real-time telemetry dashboard
*/

import { useEffect,useState } from "react"

export default function LiveVehicleDashboard({ vin }:{ vin:string }){

const [telemetry,setTelemetry] = useState<any>(null)

async function load(){

const res = await fetch(`/api/telemetry/latest/${vin}`)
const json = await res.json()

setTelemetry(json)

}

useEffect(()=>{

load()

const interval = setInterval(load,5000)

return ()=>clearInterval(interval)

},[vin])

if(!telemetry){

return(

<div className="bg-gray-900 p-6 rounded-xl">
Loading live vehicle dashboard...
</div>

)

}

return(

<div className="bg-gray-900 p-6 rounded-xl">

<h2 className="text-xl font-bold mb-6">
Live Vehicle Dashboard
</h2>

<div className="grid grid-cols-2 md:grid-cols-5 gap-6">

<div className="bg-gray-800 p-4 rounded text-center">

<div className="text-gray-400 text-sm">
Speed
</div>

<div className="text-3xl font-bold">
{telemetry.speed ?? "--"}
</div>

<div className="text-xs text-gray-400">
km/h
</div>

</div>

<div className="bg-gray-800 p-4 rounded text-center">

<div className="text-gray-400 text-sm">
RPM
</div>

<div className="text-3xl font-bold">
{telemetry.rpm ?? "--"}
</div>

</div>

<div className="bg-gray-800 p-4 rounded text-center">

<div className="text-gray-400 text-sm">
Coolant Temp
</div>

<div className="text-3xl font-bold">
{telemetry.coolant_temp ?? "--"}
</div>

<div className="text-xs text-gray-400">
°C
</div>

</div>

<div className="bg-gray-800 p-4 rounded text-center">

<div className="text-gray-400 text-sm">
Battery
</div>

<div className="text-3xl font-bold">
{telemetry.battery_voltage ?? "--"}
</div>

<div className="text-xs text-gray-400">
V
</div>

</div>

<div className="bg-gray-800 p-4 rounded text-center">

<div className="text-gray-400 text-sm">
Fuel Level
</div>

<div className="text-3xl font-bold">
{telemetry.fuel_level ?? "--"}
</div>

<div className="text-xs text-gray-400">
%
</div>

</div>

</div>

</div>

)

}