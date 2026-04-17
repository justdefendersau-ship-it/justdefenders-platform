"use client"

/*
=====================================================
INSURER PORTAL DASHBOARD
=====================================================
*/

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function InsurerDashboard() {

  const [orgs, setOrgs] = useState<any[]>([])

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase
      .from("organizations")
      .select("*")

    setOrgs(data || [])
  }

  return (
    <div>
      <h1>Insurer Overview</h1>

      {orgs.map(o => (
        <div key={o.id}>
          {o.name}
        </div>
      ))}
    </div>
  )
}