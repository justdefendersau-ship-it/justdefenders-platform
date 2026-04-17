/*
Timestamp: 5 March 2026 13:15
File: app/components/VehicleReliabilityLeaderboard.tsx

Purpose
-------
Displays Defender reliability scores
for all vehicles in the fleet.

Used by
-------
Fleet dashboards
Vehicle intelligence panels
*/

"use client"

import { useEffect, useState } from "react"

type Row = {

  vehicleId: string
  model: string
  engine: string
  vehicleAge: number
  reliabilityScore: number

}

export default function VehicleReliabilityLeaderboard() {

  const [rows,setRows] = useState<Row[]>([])

  useEffect(()=>{

    async function load(){

      const res = await fetch("/api/intelligence/global-reliability")
      const json = await res.json()

      setRows(json)

    }

    load()

  },[])

  return (

    <div className="bg-white border rounded-xl p-6 shadow-sm">

      <h2 className="text-lg font-semibold mb-4">
        Defender Reliability Scores
      </h2>

      <table className="w-full text-sm">

        <thead>

          <tr className="border-b">

            <th className="text-left py-2">Model</th>
            <th>Engine</th>
            <th>Age</th>
            <th>Reliability</th>

          </tr>

        </thead>

        <tbody>

          {rows.map((r,i)=>(

            <tr key={i} className="border-b">

              <td className="py-2">{r.model}</td>
              <td>{r.engine}</td>
              <td>{r.vehicleAge}</td>
              <td>{r.reliabilityScore}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}