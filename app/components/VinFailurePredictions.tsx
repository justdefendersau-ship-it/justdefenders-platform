/*
Timestamp: 5 March 2026 13:50
File: app/components/VinFailurePredictions.tsx

Purpose
-------
Displays predicted component failures
for Defender vehicles.

Used by
-------
Fleet dashboard
Maintenance planner
Predictive alerts system
*/

"use client"

import { useEffect, useState } from "react"

type Prediction = {

  vin: string
  predicted_part: string
  predicted_part_number: string
  probability: number
  estimated_failure_months: number

}

export default function VinFailurePredictions() {

  const [rows,setRows] = useState<Prediction[]>([])

  useEffect(()=>{

    async function load(){

      const res = await fetch("/api/intelligence/vin-failure-prediction")
      const json = await res.json()

      setRows(json)

    }

    load()

  },[])

  return (

    <div className="bg-white border rounded-xl p-6 shadow-sm">

      <h2 className="text-lg font-semibold mb-4">
        Predicted Vehicle Failures
      </h2>

      <table className="w-full text-sm">

        <thead>

          <tr className="border-b">

            <th className="text-left py-2">VIN</th>
            <th>Component</th>
            <th>Probability</th>
            <th>Est. Failure</th>

          </tr>

        </thead>

        <tbody>

          {rows.map((r,i)=>(

            <tr key={i} className="border-b">

              <td className="py-2">{r.vin}</td>
              <td>{r.predicted_part}</td>
              <td>{Math.round(r.probability*100)}%</td>
              <td>{r.estimated_failure_months} months</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}