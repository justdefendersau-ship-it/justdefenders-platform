/*
Timestamp: 5 March 2026 18:50
File: app/components/OrganizationSwitcher.tsx

Purpose
-------
Allows enterprise users to switch between organizations.

Typical use cases:

• consultants managing multiple fleets
• insurers monitoring multiple clients
*/

"use client"

import { useEffect, useState } from "react"

type Org = {

  id: string
  name: string
  subscription_tier: string

}

export default function OrganizationSwitcher() {

  const [orgs, setOrgs] = useState<Org[]>([])

  useEffect(() => {

    async function loadOrgs() {

      const res = await fetch("/api/platform/tenant-context")
      const json = await res.json()

      setOrgs(json.organizations)

    }

    loadOrgs()

  }, [])

  if (!orgs.length) {
    return <div>Loading organizations...</div>
  }

  return (

    <div className="border rounded-lg p-4 bg-white shadow-sm">

      <h3 className="text-sm font-semibold mb-2">
        Organization
      </h3>

      <select className="border rounded px-2 py-1 text-sm">

        {orgs.map(o => (

          <option key={o.id}>

            {o.name} ({o.subscription_tier})

          </option>

        ))}

      </select>

    </div>

  )

}