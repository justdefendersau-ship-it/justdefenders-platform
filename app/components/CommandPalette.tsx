"use client"

import { Command } from "cmdk"
import { useState,useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CommandPalette(){

const router=useRouter()
const [open,setOpen]=useState(false)

useEffect(()=>{

const down=(e:KeyboardEvent)=>{

if((e.metaKey||e.ctrlKey)&&e.key==="k"){

e.preventDefault()
setOpen(o=>!o)

}

}

document.addEventListener("keydown",down)

return()=>document.removeEventListener("keydown",down)

},[])

if(!open) return null

return(

<div className="fixed inset-0 bg-black/30 flex items-center justify-center">

<Command className="bg-white p-4 rounded shadow w-96">

<Command.Input placeholder="Type a command..." />

<Command.List>

<Command.Item onSelect={()=>router.push("/analytics/command-center")}>
Command Center
</Command.Item>

<Command.Item onSelect={()=>router.push("/analytics/vehicle-health")}>
Vehicle Health
</Command.Item>

</Command.List>

</Command>

</div>

)

}