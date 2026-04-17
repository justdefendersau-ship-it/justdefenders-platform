"use client"

/*
Component Risk Heatmap
Timestamp: 13 March 2026 14:05
Displays component risk levels for a vehicle
*/

import { useEffect, useState } from "react"

interface RiskData {
  component: string
  risk: number
}

export default function ComponentRiskHeatmap({ vin }: { vin: string }) {

  const [data,setData] = useState<RiskData[]>([])

  useEffect(()=>{

    async function load() {

      const res = await fetch(`/api/vehicle/component-risk?vin=${vin}`)
      const json = await res.json()

      setData(json)

    }

    load()

  },[vin])


  function riskColor(risk:number){

    if(risk < 0.3) return "bg-green-500"
    if(risk < 0.6) return "bg-yellow-500"
    return "bg-red-500"

  }


  return (

    <div className="bg-gray-900 p-6 rounded-xl">

      <h2 className="text-xl font-bold mb-4">
        Component Risk Heatmap
      </h2>

      <div className="grid grid-cols-3 gap-4">

        {data.map((c,i)=>(
          
          <div
            key={i}
            className={`p-4 rounded-lg text-white ${riskColor(c.risk)}`}
          >

            <div className="text-sm opacity-80">
              {c.component}
            </div>

            <div className="text-2xl font-bold">
              {(c.risk*100).toFixed(0)}%
            </div>

          </div>

        ))}

      </div>

    </div>

  )

}