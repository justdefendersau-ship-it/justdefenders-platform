"use client"

/*
Add Trip Page
Timestamp: 13 March 2026 21:18
Allows users to record trips
*/

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AddTripPage(){

const router = useRouter()

const [form,setForm] = useState({
vin:"",
date:"",
name:"",
distance_km:"",
duration:""
})

function update(e:any){

setForm({
...form,
[e.target.name]:e.target.value
})

}

async function submit(e:any){

e.preventDefault()

await fetch("/api/trips/create",{
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
Start Trip
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
name="name"
placeholder="Trip Name"
className="w-full bg-gray-900 text-white p-3 rounded"
onChange={update}
/>

<input
name="distance_km"
placeholder="Distance (km)"
className="w-full bg-gray-900 text-white p-3 rounded"
onChange={update}
/>

<input
name="duration"
placeholder="Duration (e.g. 4h 30m)"
className="w-full bg-gray-900 text-white p-3 rounded"
onChange={update}
/>

<button
className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
>
Save Trip
</button>

</form>

</div>

)

}