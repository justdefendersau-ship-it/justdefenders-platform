// EngineMonitorPanel.tsx
// Timestamp: 10 March 2026 20:05
// Commentary:
// Command Center panel displaying status of platform intelligence engines.

"use client"

import { useEffect, useState } from "react"

export default function EngineMonitorPanel(){

 const [data,setData] = useState<any>(null)

 useEffect(()=>{

  async function load(){

   try{

    const res = await fetch("/api/admin/engine-status")
    const result = await res.json()

    setData(result)

   }catch{

    setData({
     reliabilityTrendEngine:"offline",
     vinPredictionEngine:"offline",
     routeIntelligenceEngine:"offline",
     partsRecommendationEngine:"offline"
    })

   }

  }

  load()

 },[])

 if(!data){
  return <div>Loading engine status...</div>
 }

 return(

  <div>

   <h2 className="text-lg font-semibold text-gray-900 mb-3">
    Intelligence Engines
   </h2>

   <div className="text-base text-gray-900">
    Reliability Trend Engine: {data.reliabilityTrendEngine}
   </div>

   <div className="text-base text-gray-900">
    VIN Prediction Engine: {data.vinPredictionEngine}
   </div>

   <div className="text-base text-gray-900">
    Route Intelligence Engine: {data.routeIntelligenceEngine}
   </div>

   <div className="text-base text-gray-900">
    Parts Recommendation Engine: {data.partsRecommendationEngine}
   </div>

  </div>

 )

}