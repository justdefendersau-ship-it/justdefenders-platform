/*
Timestamp: 5 March 2026 12:55
File: app/components/PartsFailureLeaderboard.tsx

Purpose
-------
Displays most frequently failing parts
across the fleet.
*/

"use client"

import { useEffect, useState } from "react"

type Row = {

  partNumber: string
  failures: number

}

export default function PartsFailureLeaderboard() {

  const [rows,setRows] = useState<Row[]>([])

  useEffect(()=>{

    async function load(){

      const res = await fetch("/api/intelligence/part-failures")
      const json = await res.json()

      setRows(json)

    }

    load()

  },[])

  return (

    <div className="border rounded-xl p-6 bg-white shadow-sm">

      <h2 className="text-lg font-semibold mb-4">
        Most Failing Parts
      </h2>

      <table className="w-full text-sm">

        <thead>

          <tr className="border-b">

            <th className="text-left py-2">Part Number</th>
            <th>Failures</th>

          </tr>

        </thead>

        <tbody>

          {rows.map((r,i)=>(

            <tr key={i} className="border-b">

              <td className="py-2">{r.partNumber}</td>
              <td>{r.failures}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}