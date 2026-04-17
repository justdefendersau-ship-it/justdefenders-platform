"use client"

/*
Timestamp: 8 March 2026 — 18:25
Vehicle Health Radar

Displays overall fleet system health using a radar chart.
*/

import { useEffect, useState } from "react"

import {
 RadarChart,
 Radar,
 PolarGrid,
 PolarAngleAxis,
 PolarRadiusAxis,
 ResponsiveContainer
} from "recharts"

type HealthMetric = {
 system:string
 score:number
}

export default function VehicleHealthRadar(){

 const [data,setData] = useState<HealthMetric[]>([])
 const [loading,setLoading] = useState(true)

 useEffect(()=>{

  async function load(){

   try{

    const res = await fetch("/api/analytics/vehicle-health-radar")
    const json = await res.json()

    if(Array.isArray(json)){
     setData(json)
    }

   }catch(err){
    console.error("Radar load error:",err)
   }

   setLoading(false)

  }

  load()

 },[])

 return (

  <div className="bg-slate-700 border border-slate-600 rounded-xl p-6">

   <h2 className="text-lg font-semibold mb-4">
    Vehicle Health Radar
   </h2>

   {loading && (
    <div className="text-sm text-slate-300">
     Analyzing vehicle systems…
    </div>
   )}

   {!loading && data.length > 0 && (

    <div style={{width:"100%",height:260}}>

     <ResponsiveContainer>

      <RadarChart data={data}>

       <PolarGrid />

       <PolarAngleAxis dataKey="system" />

       <PolarRadiusAxis domain={[0,100]} />

       <Radar
        name="Health"
        dataKey="score"
        stroke="#22c55e"
        fill="#22c55e"
        fillOpacity={0.4}
       />

      </RadarChart>

     </ResponsiveContainer>

    </div>

   )}

  </div>

 )

}