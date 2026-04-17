"use client"

/*
Timestamp: 8 March 2026 — 20:50
Fleet Failure Knowledge Graph
*/

import dynamic from "next/dynamic"
import { useEffect,useState } from "react"

const ForceGraph = dynamic(()=>import("react-force-graph"),{ssr:false})

export default function FailureKnowledgeGraph(){

 const [graph,setGraph] = useState<any>({nodes:[],links:[]})

 useEffect(()=>{

  async function load(){

   const res = await fetch("/api/analytics/failure-knowledge-graph")
   const json = await res.json()

   setGraph(json)

  }

  load()

 },[])

 return(

  <div className="bg-slate-700 border border-slate-600 rounded-xl p-6">

   <h2 className="text-lg font-semibold mb-4">
    Fleet Failure Knowledge Graph
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