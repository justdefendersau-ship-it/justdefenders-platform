/*
Timestamp: 6 March 2026 01:45
File: app/analytics/GlobalFailureHeatmap.tsx

Purpose
-------
Displays global Defender reliability
using regional failure intensity.

Used by Fleet Intelligence Command Center.
*/

"use client"

import { useEffect, useState } from "react"

type Region = {
  region:string
  failures:number
}

export default function GlobalFailureHeatmap(){

  const [regions,setRegions] = useState<Region[]>([])

  useEffect(()=>{

    async function load(){

      try{

        const res =
          await fetch("/api/intelligence/global-heatmap")

        if(!res.ok) return

        const data = await res.json()

        setRegions(data)

      }
      catch(err){

        console.error("Heatmap load error:",err)

      }

    }

    load()

  },[])

  return(

    <div className="bg-white border rounded-xl p-6 shadow-sm">

      <div className="text-lg font-semibold mb-4">
        Global Defender Failure Heatmap
      </div>

      {regions.length === 0 && (

        <div className="text-gray-500">
          No regional failure data yet
        </div>

      )}

      {regions.map((r,index)=>(

        <div
          key={index}
          className="flex justify-between border-b py-2"
        >

          <div className="font-medium">
            {r.region}
          </div>

          <div
            className={
              r.failures > 20
                ? "text-red-600"
                : r.failures > 10
                ? "text-orange-600"
                : "text-blue-600"
            }
          >
            {r.failures}
          </div>

        </div>

      ))}

    </div>

  )

}