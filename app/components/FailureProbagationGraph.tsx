"use client"

/*
Timestamp: 8 March 2026 — 20:30
Failure Propagation Graph
*/

import dynamic from "next/dynamic"
import { useEffect,useState } from "react"

const ForceGraph = dynamic(()=>import("react-force-graph"),{ssr:false})

export default function FailurePropagationGraph({vin}:{vin:string}){

 const [graph,setGraph] = useState<any>({nodes:[],links:[]})

 useEffect(()=>{

  async function load(){

   const res = await fetch(`/api/analytics/failure-graph/${vin}`)
   const json = await res.json()

   setGraph(json)

  }

  load()

 },[vin])

 return(

  <div className="bg-slate-700 border border-slate-600 rounded-xl p-6">

   <h2 className="text-lg font-semibold mb-4">
    Failure Propagation Graph
   </h2>

   <div style={{height:300}}>

    <ForceGraph
     graphData={graph}
     nodeAutoColorBy="group"
    />

   </div>

  </div>

 )
}