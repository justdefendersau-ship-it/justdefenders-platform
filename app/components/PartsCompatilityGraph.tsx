"use client"

/*
Timestamp: 9 March 2026 — 00:15
Global Parts Compatibility Graph
*/

import dynamic from "next/dynamic"
import { useEffect,useState } from "react"

const ForceGraph = dynamic(()=>import("react-force-graph"),{ssr:false})

export default function PartsCompatibilityGraph(){

 const [graph,setGraph] = useState<any>({nodes:[],links:[]})

 useEffect(()=>{

  async function load(){

   const res = await fetch("/api/parts/compatibility-graph")
   const json = await res.json()

   setGraph(json)

  }

  load()

 },[])

 return(

  <div className="bg-slate-700 border border-slate-600 rounded-xl p-6">

   <h2 className="text-lg font-semibold mb-4">
    Global Parts Compatibility Graph
   </h2>

   <div style={{height:400}}>

    <ForceGraph
     graphData={graph}
     nodeAutoColorBy="group"
    />

   </div>

  </div>

 )
}