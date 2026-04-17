// Timestamp: 4 March 2026 17:20
// Admin Organizations List

import Link from "next/link"
import { requireRole } from "@/lib/auth"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export default async function OrganizationsAdminPage() {
  await requireRole(["admin"])

  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set() {},
        remove() {},
      },
    }
  )

  const { data: organizations } = await supabase
    .from("organizations")
    .select("*")

  return (
    <div className="space-y-10">

      <section>
        <h1 className="text-3xl font-semibold">
          Organisation Management
        </h1>

        <p className="text-gray-500 mt-2">
          Global organisation governance.
        </p>
      </section>

      <section className="space-y-4">

        {organizations?.map((org) => (
          <div
            key={org.id}
            className="bg-white border border-gray-200 rounded-xl p-6 flex justify-between items-center"
          >
            <div>
              <div className="font-medium">{org.name}</div>
              <div className="text-sm text-gray-500">
                Tier: {org.subscription_tier}
              </div>
            </div>

            <Link
              href={`/admin/organizations/${org.id}`}
              className="text-blue-600 font-medium"
            >
              Manage →
            </Link>

          </div>
        ))}

      </section>

    </div>
  )
}