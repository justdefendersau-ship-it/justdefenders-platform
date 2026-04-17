"use client"

// Timestamp 6 March 2026 23:00
// File: /app/admin/database-diagram/page.tsx

import { useEffect,useState } from "react"

export default function DatabaseDiagram(){

const [diagram,setDiagram] = useState("")

useEffect(()=>{

fetch("/api/system/database-diagram")
.then(r=>r.json())
.then(d=>setDiagram(d.diagram))

},[])

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">
Database ER Diagram
</h1>

<pre className="bg-gray-100 p-6 overflow-x-scroll">
{diagram}
</pre>

</div>

)

}