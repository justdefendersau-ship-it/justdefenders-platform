/*
Timestamp: 5 March 2026 12:47
File: app/components/ReliabilityIndexTable.tsx

Purpose
-------
Displays reliability scores across Defender models.
*/

"use client"

import { useEffect, useState } from "react"

type Row = {

  model: string
  totalVehicles: number
  failures: number
  reliabilityScore: number

}

export default function ReliabilityIndexTable() {

  const [rows, setRows] = useState<Row[]>([])

  useEffect(() => {

    async function load() {

      const res = await fetch("/api/intelligence/reliability-index")
      const json = await res.json()

      setRows(json)

    }

    load()

  }, [])

  return (

    <div className="border rounded-xl p-6 bg-white shadow-sm">

      <h2 className="text-lg font-semibold mb-4">
        Defender Reliability Index
      </h2>

      <table className="w-full text-sm">

        <thead>

          <tr className="text-left border-b">

            <th className="py-2">Model</th>
            <th>Total Vehicles</th>
            <th>Failures</th>
            <th>Reliability</th>

          </tr>

        </thead>

        <tbody>

          {rows.map((r,i)=> (

            <tr key={i} className="border-b">

              <td className="py-2">{r.model}</td>
              <td>{r.totalVehicles}</td>
              <td>{r.failures}</td>
              <td>{r.reliabilityScore}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}