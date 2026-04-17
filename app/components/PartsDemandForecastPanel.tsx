"use client"

/*
Timestamp: 9 March 2026 — 00:40
Parts Demand Forecast Panel
*/

import { useEffect,useState } from "react"

export default function PartsDemandForecastPanel(){

 const [forecast,setForecast] = useState<any[]>([])

 useEffect(()=>{

  async function load(){

   const res = await fetch("/api/parts/demand-forecast")
   const json = await res.json()

   if(Array.isArray(json)){
    setForecast(json)
   }

  }

  load()

 },[])

 return(

  <div className="bg-slate-700 border border-slate-600 rounded-xl p-6">

   <h2 className="text-lg font-semibold mb-4">
    Parts Demand Forecast
   </h2>

   <div className="space-y-3">

    {forecast.map((f,i)=>(
     
     <div
      key={i}
      className="p-3 bg-slate-800 border border-slate-600 rounded"
     >

      <div className="font-semibold">
       {f.part}
      </div>

      <div className="text-sm text-slate-300">
       Forecast Demand: {f.forecastDemand}
      </div>

      <div className="text-xs text-slate-400">
       Timeframe: {f.timeframe}
      </div>

     </div>

    ))}

   </div>

  </div>

 )
}