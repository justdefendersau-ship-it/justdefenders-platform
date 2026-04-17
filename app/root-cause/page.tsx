"use client"

// Timestamp 6 March 2026 15:00
// File: /app/root-cause/page.tsx

import { useEffect, useState } from "react"

export default function RootCauseDashboard() {

  const [reports, setReports] = useState<any[]>([])

  useEffect(() => {

    fetch("/api/root-cause-reports")
      .then(res => res.json())
      .then(data => setReports(data.reports))

  }, [])

  return (

    <div className="p-10 space-y-6">

      <h1 className="text-3xl font-bold">

        Automated Root Cause Analysis

      </h1>

      {reports.map((r, i) => (

        <div key={i} className="border-b py-3">

          <div>
            Component: {r.component}
          </div>

          <div>
            Failure Cluster: {r.failure_cluster_size} vehicles
          </div>

          <div>
            Confidence: {(r.confidence * 100).toFixed(1)}%
          </div>

          <div>
            Cause: {r.suspected_root_cause}
          </div>

        </div>

      ))}

    </div>

  )

}