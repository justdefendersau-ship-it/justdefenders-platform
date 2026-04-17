/*
Timestamp: 5 March 2026 19:47
File: app/analytics/FailureHeatmap.tsx

Purpose
-------
Global Defender Failure Heatmap.

Shows regional reliability scores.
*/

"use client"

import { useEffect, useState } from "react"

type RegionData = {

  region:string
  vehicles:number
  failures:number
  reliability:number

}

export default function FailureHeatmap(){

  const [data,setData] = useState<RegionData[]>([])

  useEffect(()=>{

    async function load(){

      const res = await fetch("/api/intelligence/failure-heatmap")

      const json = await res.json()

      setData(json)

    }

    load()

  },[])

  function color(score:number){

    if(score>90) return "bg-green-500"

    if(score>75) return "bg-yellow-400"

    return "bg-red-500"

  }

  return(

    <div className="bg-white border rounded-xl p-6 shadow-sm">

      <h2 className="text-lg font-semibold mb-4">
        Global Failure Heatmap
      </h2>

      <div className="space-y-4">

        {data.map((r,i)=>(
          <div key={i} className="flex items-center gap-4">

            <div className="w-28">
              {r.region}
            </div>

            <div className="flex-1 bg-gray-200 rounded h-4">

              <div
                className={`${color(r.reliability)} h-4 rounded`}
                style={{width:`${r.reliability}%`}}
              />

            </div>

            <div className="w-16 text-right">
              {r.reliability}%
            </div>

          </div>
        ))}

      </div>

    </div>

  )

}