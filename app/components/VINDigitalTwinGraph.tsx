/*
Timestamp: 7 March 2026 — 23:56
File: /app/components/VINDigitalTwinGraph.tsx

Purpose:
Display VIN digital twin component graph.
*/

"use client"

import { useEffect,useState } from "react"
import ForceGraph2D from "react-force-graph-2d"

interface Node{

 id:string
 label:string

}

interface Link{

 source:string
 target:string

}

export default function VINDigitalTwinGraph({ vin }:{ vin:string }){

 const [data,setData] = useState<{nodes:Node[],links:Link[]}>({
  nodes:[],
  links:[]
 })

 useEffect(()=>{

  if(!vin) return

  async function load(){

   const res = await fetch(`/api/vehicles/vin-digital-twin?vin=${vin}`)

   const graph = await res.json()

   setData(graph)

  }

  load()

 },[vin])

 return(

 <div className="bg-slate-900 border border-neutral-800 rounded-xl p-6">

  <h2 className="text-lg font-semibold mb-4">

   VIN Digital Twin

  </h2>

  <div className="h-[500px]">

   <ForceGraph2D
    graphData={data}
    nodeLabel={(node:any)=>node.label}
    nodeAutoColorBy="label"
   />

  </div>

 </div>

 )

}