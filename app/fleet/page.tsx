"use client"

// Timestamp 6 March 2026 13:15
// File: /app/fleet/page.tsx

import { useEffect, useState } from "react"

export default function FleetDashboard() {

  const [vehicles, setVehicles] = useState<any[]>([])
  const [alerts, setAlerts] = useState<any[]>([])

  const organizationId = "demo-org"

  useEffect(() => {

    fetch(`/api/fleet/vehicles?organization_id=${organizationId}`)
      .then(res => res.json())
      .then(data => setVehicles(data.vehicles))

    fetch(`/api/fleet/maintenance-alerts?organization_id=${organizationId}`)
      .then(res => res.json())
      .then(data => setAlerts(data.alerts))

  }, [])

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-8">

        Fleet Management

      </h1>

      <section className="mb-10">

        <h2 className="text-xl font-semibold mb-4">

          Predictive Maintenance Alerts

        </h2>

        {alerts.map((a, i) => (

          <div
            key={i}
            className="border-b py-2 flex justify-between"
          >

            <span>{a.vin}</span>

            <span>{a.component}</span>

            <span>{a.predicted_failure_date}</span>

          </div>

        ))}

      </section>

      <section>

        <h2 className="text-xl font-semibold mb-4">

          Fleet Vehicles

        </h2>

        {vehicles.map((v, i) => (

          <div
            key={i}
            className="border-b py-3 flex justify-between"
          >

            <span>{v.vin}</span>

            <span>{v.model}</span>

            <span>

              Risk Score: {v.risk?.insurance_risk_score ?? "N/A"}

            </span>

          </div>

        ))}

      </section>

    </div>

  )

}