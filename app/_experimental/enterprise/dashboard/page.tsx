// Timestamp: 3 March 2026 20:10
// Enterprise Dashboard Surface

import { requireRole } from "@/app/lib/auth"

export default async function EnterpriseDashboard() {
  await requireRole(["enterprise"])

  return (
    <div className="space-y-12">

      <section>
        <h1 className="text-4xl font-semibold tracking-tight">
          Enterprise Dashboard
        </h1>
        <p className="text-gray-500 mt-3">
          Organisation-level fleet intelligence and monitoring
        </p>
      </section>

      <section className="bg-gray-50 rounded-3xl p-14 border border-gray-200">
        <div className="text-gray-600">
          Enterprise modules will render here.
        </div>
      </section>

    </div>
  )
}