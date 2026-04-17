/*
Timestamp: 5 March 2026 18:55
File: app/components/EnterpriseOverview.tsx

Purpose
-------
Displays enterprise platform statistics across tenants.

This is typically used by:

• platform administrators
• insurers
• enterprise customers
*/

"use client"

import { useEffect, useState } from "react"

type Data = {

  users: any[]
  organizations: any[]

}

export default function EnterpriseOverview() {

  const [data, setData] = useState<Data | null>(null)

  useEffect(() => {

    async function loadData() {

      const res = await fetch("/api/platform/tenant-context")
      const json = await res.json()

      setData(json)

    }

    loadData()

  }, [])

  if (!data) {
    return <div>Loading enterprise data...</div>
  }

  return (

    <div className="bg-white border rounded-xl p-6 shadow-sm">

      <h2 className="text-lg font-semibold mb-4">
        Enterprise Platform Overview
      </h2>

      <div className="grid grid-cols-3 gap-6">

        <div>

          <div className="text-sm text-gray-500">
            Organizations
          </div>

          <div className="text-xl font-semibold">
            {data.organizations.length}
          </div>

        </div>

        <div>

          <div className="text-sm text-gray-500">
            Platform Users
          </div>

          <div className="text-xl font-semibold">
            {data.users.length}
          </div>

        </div>

        <div>

          <div className="text-sm text-gray-500">
            Avg Users per Org
          </div>

          <div className="text-xl font-semibold">
            {(data.users.length / data.organizations.length).toFixed(1)}
          </div>

        </div>

      </div>

    </div>

  )

}