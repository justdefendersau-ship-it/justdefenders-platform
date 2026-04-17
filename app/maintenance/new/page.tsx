"use client"

/*
Add Maintenance Record Page
Timestamp: 13 March 2026 20:45
Allows users to log vehicle maintenance
*/

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AddMaintenancePage(){

const router = useRouter()

const [form,setForm] = useState({
vin:"",
date:"",
description:"",
cost:"",
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

await fetch("/api/maintenance/create",{
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
Log Maintenance
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
name="description"
placeholder="Service Description"
className="w-full bg-gray-900 text-white p-3 rounded"
onChange={update}
/>

<input
name="cost"
placeholder="Cost"
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
className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded"
>
Save Maintenance Record
</button>

</form>

</div>

)

}