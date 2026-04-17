"use client"

/*
Timestamp: 8 March 2026 — 18:40
Fleet Risk Distribution Chart

Displays fleet vehicles grouped by risk level.
*/

import { useEffect, useState } from "react"

import {
 PieChart,
 Pie,
 Cell,
 ResponsiveContainer,
 Tooltip,
 Legend
} from "recharts"

type RiskData = {
 name:string
 value:number
}

const COLORS = ["#22c55e","#f59e0b","#ef4444"]

export default function FleetRiskDistributionChart(){

 const [data,setData] = useState<RiskData[]>([])
 const [loading,setLoading] = useState(true)

 useEffect(()=>{

  async function load(){

   try{

    const res = await fetch("/api/analytics/fleet-risk-distribution")
    const json = await res.json()

    if(Array.isArray(json)){
     setData(json)
    }

   }catch(err){
    console.error("Risk distribution load error:",err)
   }

   setLoading(false)

  }

  load()

 },[])

 return (

  <div className="bg-slate-700 border border-slate-600 rounded-xl p-6">

   <h2 className="text-lg font-semibold mb-4">
    Fleet Risk Distribution
   </h2>

   {loading && (
    <div className="text-sm text-slate-300">
     Calculating fleet risk…
    </div>
   )}

   {!loading && data.length > 0 && (

    <div style={{width:"100%",height:260}}>

     <ResponsiveContainer>

      <PieChart>

       <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        outerRadius={90}
        label
       >

        {data.map((entry,index)=>(
         <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}

       </Pie>

       <Tooltip />

       <Legend />

      </PieChart>

     </ResponsiveContainer>

    </div>

   )}

  </div>

 )

}