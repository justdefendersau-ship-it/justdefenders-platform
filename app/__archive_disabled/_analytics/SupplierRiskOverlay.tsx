/*
Timestamp: 5 March 2026 20:22
File: app/analytics/SupplierRiskOverlay.tsx

Purpose
-------
Displays supplier reliability risk ranking.
*/

"use client"

import { useEffect, useState } from "react"

type SupplierRisk = {

  supplier:string
  failures:number

}

export default function SupplierRiskOverlay(){

  const [data,setData] = useState<SupplierRisk[]>([])

  useEffect(()=>{

    async function load(){

      const res = await fetch("/api/intelligence/supplier-risk")

      const json = await res.json()

      setData(json)

    }

    load()

  },[])

  return(

    <div className="bg-white border rounded-xl p-6 shadow-sm">

      <h2 className="text-lg font-semibold mb-4">
        Supplier Risk Overlay
      </h2>

      <div className="space-y-4">

        {data.map((s,i)=>(

          <div key={i} className="flex items-center gap-4">

            <div className="w-32">
              {s.supplier}
            </div>

            <div className="flex-1 bg-gray-200 rounded h-4">

              <div
                className="bg-red-500 h-4 rounded"
                style={{width:`${s.failures*5}%`}}
              />

            </div>

            <div className="w-16 text-right">
              {s.failures}
            </div>

          </div>

        ))}

      </div>

    </div>

  )

}