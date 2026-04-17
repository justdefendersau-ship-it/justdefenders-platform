/*
Timestamp: 5 March 2026 22:55
File: app/analytics/GlobalReliabilityScore.tsx

Purpose
-------
Displays the Defender Global Reliability Score.
This component fetches the score from the API and renders
a dashboard card used by the Command Center.
*/

"use client"

import { useEffect, useState } from "react"

type ScoreData = {
  score:number
  vehicles:number
  failures:number
}

export default function GlobalReliabilityScore(){

  const [data,setData] = useState<ScoreData | null>(null)

  useEffect(()=>{

    async function load(){

      try{

        const res =
          await fetch("/api/intelligence/global-reliability-score")

        const json = await res.json()

        setData(json)

      }
      catch(err){

        console.error("Reliability score load failed",err)

      }

    }

    load()

  },[])

  if(!data){

    return(
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        Loading reliability score...
      </div>
    )

  }

  return(

    <div className="bg-white border rounded-xl p-6 shadow-sm">

      <div className="text-sm text-gray-500">
        Defender Global Reliability Score
      </div>

      <div className="text-4xl font-semibold text-green-600 mt-2">
        {data.score}
      </div>

      <div className="text-sm text-gray-500 mt-2">
        Based on {data.vehicles} vehicles
      </div>

      <div className="text-sm text-gray-500">
        {data.failures} recorded failures
      </div>

    </div>

  )

}