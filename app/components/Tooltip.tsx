"use client"

/*
Tooltip Component
Timestamp: 14 March 2026 08:16
Displays tooltip below element so it never hides behind panel header
*/

import { useState } from "react"

export default function Tooltip({
children,
content
}:{
children:React.ReactNode
content:React.ReactNode
}){

const [visible,setVisible] = useState(false)

return(

<div
className="relative inline-block"
onMouseEnter={()=>setVisible(true)}
onMouseLeave={()=>setVisible(false)}
>

{children}

{visible && (

<div className="absolute top-full mt-2 right-0 bg-gray-800 text-gray-200 text-xs p-2 rounded shadow-lg whitespace-nowrap z-50">

{content}

</div>

)}

</div>

)

}