"use client"

/*
Add Fuel Log Page
Timestamp: 13 March 2026 20:18
Allows users to record fuel entries
*/

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AddFuelPage(){

const router = useRouter()

const [form,setForm] = useState({
vin:"",
date:"",
litres:"",
total_cost:"",
odometer:""
})

function update(e:any){

setForm({
...form,
[e.target.name]:e.target.value
})

}

async function submit(e:any){

e.preventDefault()

await fetch("/api/fuel/create",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(form)
})

router.push("/")

}

return(

<div className="max-w-xl mx-auto p-6 space-y-6">

<h1 className="text-2xl font-bold">
Log Fuel
</h1>

<form
onSubmit={submit}
className="space-y-4"
>

<input
name="vin"
placeholder="Vehicle VIN"
className="w-full bg-gray-900 text-white p-3 rounded"
onChange={update}
/>

<input
type="date"
name="date"
className="w-full bg-gray-900 text-white p-3 rounded"
onChange={update}
/>

<input
name="litres"
placeholder="Litres"
className="w-full bg-gray-900 text-white p-3 rounded"
onChange={update}
/>

<input
name="total_cost"
placeholder="Total Cost"
className="w-full bg-gray-900 text-white p-3 rounded"
onChange={update}
/>

<input
name="odometer"
placeholder="Odometer (km)"
className="w-full bg-gray-900 text-white p-3 rounded"
onChange={update}
/>

<button
className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
>
Save Fuel Log
</button>

</form>

</div>

)

}