"use client"

// Timestamp 6 March 2026 13:35
// File: /app/fleet/vehicle/[vin]/page.tsx

import { useEffect, useState } from "react"

export default function VehiclePage(
  { params }: { params: { vin: string } }
) {

  const [data, setData] = useState<any>(null)

  useEffect(() => {

    fetch(`/api/vehicles/${params.vin}`)
      .then(res => res.json())
      .then(setData)

  }, [])

  if (!data) {

    return <div className="p-10">Loading vehicle intelligence...</div>

  }

  return (

    <div className="p-10 space-y-10">

      <h1 className="text-3xl font-bold">

        Vehicle Intelligence — {params.vin}

      </h1>

      <section>

        <h2 className="text-xl font-semibold mb-3">

          Reliability Risk

        </h2>

        <div>

          Insurance Risk Score: {data.risk?.insurance_risk_score ?? "N/A"}

        </div>

      </section>

      <section>

        <h2 className="text-xl font-semibold mb-3">

          AI Insights

        </h2>

        {data.insights?.map((i: any, index: number) => (

          <div key={index} className="border-b py-2">

            {i.description}

          </div>

        ))}

      </section>

      <section>

        <h2 className="text-xl font-semibold mb-3">

          Recent Fault Codes

        </h2>

        {data.faults?.map((f: any, index: number) => (

          <div key={index} className="flex justify-between border-b py-2">

            <span>{f.fault_code}</span>
            <span>{f.recorded_at}</span>

          </div>

        ))}

      </section>

      <section>

        <h2 className="text-xl font-semibold mb-3">

          Maintenance History

        </h2>

        {data.maintenance?.map((m: any, index: number) => (

          <div key={index} className="border-b py-2">

            {m.service_date} — {m.description}

          </div>

        ))}

      </section>

      <section>

        <h2 className="text-xl font-semibold mb-3">

          Recent Telemetry

        </h2>

        {data.telemetry?.map((t: any, index: number) => (

          <div key={index} className="flex justify-between border-b py-2">

            <span>{t.timestamp}</span>
            <span>Temp: {t.engine_temp}</span>
            <span>Load: {t.engine_load}</span>

          </div>

        ))}

      </section>

    </div>

  )

}