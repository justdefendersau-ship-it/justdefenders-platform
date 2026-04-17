"use client"

import { usePathname } from "next/navigation"

export default function Breadcrumbs(){

const pathname = usePathname() ?? ""

const segments = pathname.split("/").filter(Boolean)

return(

<div className="text-sm text-gray-500 mb-4">

{segments.length === 0 && (
<span>Home</span>
)}

{segments.map((segment,index)=>{

const label = segment
.replace("-", " ")
.replace(/\b\w/g,c=>c.toUpperCase())

return(

<span key={index}>

{label}

{index < segments.length - 1 && " / "}

</span>

)

})}

</div>

)

}