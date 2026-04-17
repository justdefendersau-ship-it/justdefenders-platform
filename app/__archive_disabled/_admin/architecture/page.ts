"use client"

// Timestamp 6 March 2026 23:00
// File: /app/admin/architecture/page.tsx

import { useEffect,useState } from "react"

export default function ArchitecturePage(){

const [diagram,setDiagram] = useState("")

useEffect(()=>{

fetch("/api/system/architecture-diagram")
.then(r=>r.json())
.then(d=>setDiagram(d.diagram))

},[])

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">
System Architecture
</h1>

<pre className="bg-gray-100 p-6 overflow-x-scroll">
{diagram}
</pre>

</div>

)

}