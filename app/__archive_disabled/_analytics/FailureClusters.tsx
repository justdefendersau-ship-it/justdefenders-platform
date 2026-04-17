/*
Timestamp: 5 March 2026 20:07
File: app/analytics/FailureClusters.tsx

Purpose
-------
Displays detected fleet failure clusters.
*/

"use client"

import { useEffect, useState } from "react"

type Cluster = {

  region:string
  model:string
  component:string
  failures:number
  severity:string

}

export default function FailureClusters(){

  const [clusters,setClusters] = useState<Cluster[]>([])

  useEffect(()=>{

    async function load(){

      const res = await fetch("/api/intelligence/failure-clusters")

      const json = await res.json()

      setClusters(json)

    }

    load()

  },[])

  function color(level:string){

    if(level==="critical") return "text-red-600"

    if(level==="high") return "text-orange-500"

    return "text-yellow-600"

  }

  return(

    <div className="bg-white border rounded-xl p-6 shadow-sm">

      <h2 className="text-lg font-semibold mb-4">
        Failure Cluster Detection
      </h2>

      {clusters.length===0 && (

        <div className="text-gray-500">
          No emerging failure clusters detected.
        </div>

      )}

      <div className="space-y-4">

        {clusters.map((c,i)=>(

          <div key={i} className="border p-4 rounded">

            <div className="font-semibold">
              {c.model}
            </div>

            <div className="text-sm text-gray-600">
              Region: {c.region}
            </div>

            <div className="text-sm">
              Component: {c.component}
            </div>

            <div className={`text-sm ${color(c.severity)}`}>
              Severity: {c.severity}
            </div>

            <div className="text-sm">
              Failures: {c.failures}
            </div>

          </div>

        ))}

      </div>

    </div>

  )

}