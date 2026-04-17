// Timestamp: 4 March 2026 10:05
// Admin Platform Dashboard

import { requireRole } from "@/app/lib/auth"

export default async function AdminPage() {
  await requireRole(["admin"])

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-semibold">
        Platform Administration
      </h1>

      <p className="text-gray-500">
        Global system management and oversight.
      </p>
    </div>
  )
}