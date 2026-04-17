// Timestamp: 3 March 2026 20:12
// Insurance Dashboard Surface

import { requireRole } from "@/app/lib/auth"

export default async function InsurerDashboard() {
  await requireRole(["insurance"])

  return (
    <div className="space-y-12">

      <section>
        <h1 className="text-4xl font-semibold tracking-tight">
          Insurance Risk Dashboard
        </h1>
        <p className="text-gray-500 mt-3">
          Aggregated exposure modelling and IFRS analytics
        </p>
      </section>

      <section className="bg-gray-50 rounded-3xl p-14 border border-gray-200">
        <div className="text-gray-600">
          Risk aggregate modules will render here.
        </div>
      </section>

    </div>
  )
}