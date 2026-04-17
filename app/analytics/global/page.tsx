"use client"

import { useEffect,useState } from "react"
import GlobalReliabilityMap from "@/app/components/GlobalReliabilityMap"

export default function GlobalAnalytics(){

const [data,setData]=useState<any>(null)

useEffect(()=>{

fetch("/api/analytics/global-map")
.then(r=>r.json())
.then(setData)

},[])

if(!data) return <div className="p-10">Loading map...</div>

return(

<div className="p-8 space-y-6">

<h1 className="text-3xl font-bold">
Global Defender Reliability Intelligence
</h1>

<GlobalReliabilityMap data={data}/>

</div>

)

}