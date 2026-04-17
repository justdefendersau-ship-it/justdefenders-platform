"use client"

/*
Vehicle Selector Component
Timestamp: 13 March 2026 22:22
Dropdown selector for user vehicles
*/

import { useEffect,useState } from "react"

interface Vehicle {

vin:string
make:string
model:string
nickname:string
year:number

}

export default function VehicleSelector({
value,
onChange
}:{
value:string
onChange:(vin:string)=>void
}){

const [vehicles,setVehicles] = useState<Vehicle[]>([])

useEffect(()=>{

async function load(){

const res = await fetch("/api/vehicles/list")
const json = await res.json()

setVehicles(json)

}

load()

},[])

return(

<select
value={value}
onChange={(e)=>onChange(e.target.value)}
className="w-full bg-gray-900 text-white p-3 rounded"
>

<option value="">
Select Vehicle
</option>

{vehicles.map(v => (

<option
key={v.vin}
value={v.vin}
>

{v.year} {v.model} — {v.nickname || v.make}

</option>

))}

</select>

)

}