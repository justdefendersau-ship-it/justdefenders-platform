"use client"

/*
=====================================================
ENTERPRISE MONITORING DASHBOARD
Timestamp: 26 Feb 2026 22:15
=====================================================
*/

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function MonitoringPage() {

  const [logs, setLogs] = useState<any[]>([])

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase
      .from("platform_audit_log")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50)

    setLogs(data || [])
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Enterprise Monitoring</h1>

      {logs.map(log => (
        <div key={log.id} style={{ marginBottom: 10 }}>
          {log.created_at} — {log.event_type}
        </div>
      ))}
    </div>
  )
}