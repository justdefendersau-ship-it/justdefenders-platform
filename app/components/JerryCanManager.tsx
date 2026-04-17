"use client"

/*
Jerry Can Manager
Timestamp: 14 March 2026 00:26
Manage portable fuel containers
*/

import { useEffect,useState } from "react"

interface Container{

id:string
container_type:string
capacity_l:number
current_litres:number

}

export default function JerryCanManager({vin}:{vin:string}){

const [containers,setContainers] = useState<Container[]>([])

const [type,setType] = useState("")
const [capacity,setCapacity] = useState("")

useEffect(()=>{

async function load(){

const res = await fetch(`/api/vehicle/fuel-containers/${vin}`)
const json = await res.json()

setContainers(json)

}

load()

},[vin])

async function addContainer(){

await fetch("/api/vehicle/fuel-containers/add",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

vin,
container_type:type,
capacity_l:capacity,
current_litres:capacity

})

})

location.reload()

}

return(

<div className="bg-gray-900 p-6 rounded-xl space-y-4">

<h2 className="text-xl font-bold">
Jerry Cans / Portable Fuel
</h2>

{containers.map(c=>(
<div key={c.id} className="flex justify-between text-sm">

<span>{c.container_type}</span>
<span>{c.current_litres}/{c.capacity_l}L</span>

</div>
))}

<div className="border-t border-gray-800 pt-4 space-y-3">

<input
placeholder="Container type"
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

<button
onClick={addContainer}
className="bg-green-600 px-4 py-2 rounded"
>
Add Container
</button>

</div>

</div>

)

}