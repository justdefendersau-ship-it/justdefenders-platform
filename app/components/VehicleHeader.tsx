"use client"

/*
Vehicle Header Identity Bar
Timestamp: 13 March 2026 23:03
Displays vehicle identity across vehicle modules
*/

import { useEffect,useState } from "react"

interface Vehicle{

vin:string
make:string
model:string
year:number
engine:string
nickname:string
health_score:number

}

export default function VehicleHeader({vin}:{vin:string}){

const [vehicle,setVehicle] = useState<Vehicle | null>(null)

useEffect(()=>{

async function load(){

const res = await fetch(`/api/vehicles/${vin}`)
const json = await res.json()

setVehicle(json)

}

load()

},[vin])

if(!vehicle){

return(

<div className="bg-gray-900 p-4 rounded-xl">
Loading vehicle…
</div>

)

}

return(

<div className="bg-gray-900 p-6 rounded-xl space-y-2">

<h1 className="text-2xl font-bold">

{vehicle.model}
{vehicle.nickname && ` — ${vehicle.nickname}`}

</h1>

<div className="text-sm text-gray-400 space-x-4">

<span>
VIN: {vehicle.vin}
</span>

<span>
Year: {vehicle.year}
</span>

<span>
Engine: {vehicle.engine}
</span>

<span>
Health Score: {vehicle.health_score ?? "—"}
</span>

</div>

</div>

)

}