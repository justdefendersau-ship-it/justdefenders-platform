"use client"

/*
Timestamp: 8 March 2026 — 20:30
VIN System Health Radar
*/

import { useEffect,useState } from "react"
import {
 RadarChart,
 Radar,
 PolarGrid,
 PolarAngleAxis,
 PolarRadiusAxis,
 ResponsiveContainer
} from "recharts"

export default function VINHealthRadar({vin}:{vin:string}){

 const [data,setData] = useState<any[]>([])

 useEffect(()=>{

  async function load(){

   const res = await fetch(`/api/analytics/vin-health/${vin}`)
   const json = await res.json()

   if(Array.isArray(json)){
    setData(json)
   }

  }

  load()

 },[vin])

 return(

  <div className="bg-slate-700 border border-slate-600 rounded-xl p-6">

   <h2 className="text-lg font-semibold mb-4">
    VIN System Health
   </h2>

   <div style={{width:"100%",height:260}}>

    <ResponsiveContainer>

     <RadarChart data={data}>

      <PolarGrid />

      <PolarAngleAxis dataKey="system" />

      <PolarRadiusAxis domain={[0,100]} />

      <Radar
       dataKey="score"
       stroke="#22c55e"
       fill="#22c55e"
       fillOpacity={0.4}
      />

     </RadarChart>

    </ResponsiveContainer>

   </div>

  </div>

 )
}