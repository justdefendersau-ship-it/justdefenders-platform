// Timestamp 6 March 2026 22:05
// File: /app/analytics/components/ComponentFailureHeatmap.tsx

"use client"

type ComponentStat = {
  part_number: string
  failure_rate: number
}

export default function ComponentFailureHeatmap({
  data
}: {
  data: ComponentStat[]
}) {

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="font-semibold mb-4">
        Component Failure Heatmap
      </h2>

      <div className="grid grid-cols-4 gap-3">

        {data.map((c, i) => {

          const intensity =
            Math.min(1, c.failure_rate)

          const color =
            `rgba(239,68,68,${intensity})`

          return (

            <div
              key={i}
              style={{ background: color }}
              className="p-4 rounded text-white text-sm"
            >

              <div>{c.part_number}</div>

              <div>
                {(c.failure_rate * 100).toFixed(1)}%
              </div>

            </div>

          )

        })}

      </div>

    </div>

  )

}