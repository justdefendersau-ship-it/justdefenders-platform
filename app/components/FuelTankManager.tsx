"use client"

/*
Fuel Tank Manager
Timestamp: 14 March 2026 00:07

Allows users to define tanks attached to vehicle
*/

import { useEffect,useState } from "react"

interface Tank {

id:string
tank_type:string
capacity_l:number
description:string

}

export default function FuelTankManager({vin}:{vin:string}){

const [tanks,setTanks] = useState<Tank[]>([])
const [type,setType] = useState("")
const [capacity,setCapacity] = useState("")
const [description,setDescription] = useState("")

useEffect(()=>{

async function load(){

const res = await fetch(`/api/vehicle/fuel-systems/${vin}`)
const json = await res.json()

setTanks(json)

}

load()

},[vin])

async function addTank(){

await fetch("/api/vehicle/fuel-systems/add",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

vin,
tank_type:type,
capacity_l:capacity,
description

})

})

location.reload()

}

return(

<div className="bg-gray-900 p-6 rounded-xl space-y-4">

<h2 className="text-xl font-bold">
Fuel System
</h2>

{tanks.map(t=>(
<div key={t.id} className="flex justify-between text-sm">

<span>{t.tank_type}</span>
<span>{t.capacity_l}L</span>

</div>
))}

<div className="border-t border-gray-800 pt-4 space-y-3">

<input
placeholder="Tank type (Main / Aux / Wing)"
className="w-full bg-gray-800 p-2 rounded"
value={type}
onChange={(e)=>setType(e.target.value)}
/>

<input
type="number"
placeholder="Capacity (L)"
className="w-full bg-gray-800 p-2 rounded"
value={capacity}
onChange={(e)=>setCapacity(e.target.value)}
/>

<input
placeholder="Description"
className="w-full bg-gray-800 p-2 rounded"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<button
onClick={addTank}
className="bg-green-600 px-4 py-2 rounded"
>
Add Tank
</button>

</div>

</div>

)

}