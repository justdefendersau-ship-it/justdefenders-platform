// Timestamp 6 March 2026 22:05
// File: /app/analytics/components/SupplierRanking.tsx

"use client"

type Supplier = {
  supplier_name: string
  reliability_score: number
}

export default function SupplierRanking({
  suppliers
}: {
  suppliers: Supplier[]
}) {

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="font-semibold mb-4">
        Supplier Reliability Ranking
      </h2>

      <div className="space-y-2">

        {suppliers
          .sort((a, b) =>
            b.reliability_score - a.reliability_score
          )
          .map((s, i) => (

            <div
              key={i}
              className="flex justify-between border-b pb-2"
            >

              <div>{s.supplier_name}</div>

              <div className="font-semibold">
                {s.reliability_score.toFixed(1)}
              </div>

            </div>

          ))}

      </div>

    </div>

  )

}