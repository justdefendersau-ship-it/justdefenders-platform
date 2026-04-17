/*
Timestamp: 7 March 2026 — 20:11
File: /app/components/FleetReliabilityScorePanel.tsx

Purpose:
Display vehicle reliability scores across the fleet.
*/

"use client"

import { useEffect,useState } from "react"

interface Score{

 vin:string
 reliability_score:number
 risk_level:string

}

export default function FleetReliabilityScorePanel(){

 const [scores,setScores] = useState<Score[]>([])
 const [loading,setLoading] = useState(true)

 useEffect(()=>{

  async function load(){

   try{

    const res = await fetch("/api/analytics/reliability-scores")
    const data = await res.json()

    if(Array.isArray(data)){
     setScores(data)
    }else{
     setScores([])
    }

   }catch(err){

    console.error("Score fetch error:",err)
    setScores([])

   }finally{

    setLoading(false)

   }

  }

  load()

 },[])

 return(

 <div className="bg-slate-900 rounded-xl p-6 border border-neutral-800">

  <h2 className="text-xl font-semibold mb-4">
   Fleet Reliability Scores
  </h2>

  <div className="space-y-3">

   {loading && (
    <div className=" text-neutral-400 text-sm">
     Calculating reliability scores...
    </div>
   )}

   {!loading && scores.length === 0 && (
    <div className=" text-neutral-400 text-sm">
     No reliability scores available
    </div>
   )}

   {scores.slice(0,10).map((s,i)=>{

    const color =
     s.risk_level === "critical"
      ? "text-red-400"
      : s.risk_level === "high"
      ? "text-orange-400"
      : s.risk_level === "moderate"
      ? "text-yellow-400"
      : "text-green-400"

    return(

     <div
      key={i}
      className="bg-slate-800 rounded-lg p-4 flex justify-between items-center"
     >

      <div className="font-mono text-sm  text-neutral-300">
       VIN {s.vin}
      </div>

      <div className={`font-bold ${color}`}>
       {s.reliability_score}
      </div>

     </div>

    )

   })}

  </div>

 </div>

 )

}