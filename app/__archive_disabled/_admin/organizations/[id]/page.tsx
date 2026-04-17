// Timestamp: 4 March 2026 18:42
// Organization Detail Page with editable tier

import { requireRole } from "@/lib/auth"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { updateOrganizationTier } from "./actions"

export default async function OrganizationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireRole(["admin"])

  const { id } = await params

  if (!id) {
    return <div>Invalid organization ID</div>
  }

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

  const { data: organization, error } = await supabase
    .from("organizations")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error) {
    console.error("ORG FETCH ERROR:", error)
    return <div>Error loading organization.</div>
  }

  if (!organization) {
    notFound()
  }

  const displayName = organization.name
    .replace(" Pty Ltd", "")
    .replace(" Pty. Ltd.", "")
    .trim()

  return (
    <div className="space-y-12">

      <section>
        <h1 className="text-4xl font-semibold">
          {displayName}
        </h1>

        <p className="text-gray-500 mt-2">
          Organisation ID: {organization.id}
        </p>
      </section>

      <section className="bg-white rounded-2xl border border-gray-200 p-8 space-y-8">

        {/* Subscription Tier */}

        <div>
          <div className="text-sm text-gray-500 uppercase mb-2">
            Subscription Tier
          </div>

          <form
            action={async (formData) => {
              "use server"
              const tier = formData.get("tier") as string
              await updateOrganizationTier(id, tier)
            }}
          >
            <select
              name="tier"
              defaultValue={organization.subscription_tier}
              className="border rounded-lg px-4 py-2"
            >
              <option value="club">club</option>
              <option value="pro">pro</option>
              <option value="enterprise">enterprise</option>
              <option value="insurance">insurance</option>
            </select>

            <button
              type="submit"
              className="ml-4 bg-gray-900 text-white px-4 py-2 rounded-lg"
            >
              Update
            </button>
          </form>
        </div>

        {/* Created Timestamp */}

        <div>
          <div className="text-sm text-gray-500 uppercase">
            Created At
          </div>

          <div className="mt-1">
            {new Date(organization.created_at).toLocaleString("en-AU", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false
            })}
          </div>
        </div>

      </section>

    </div>
  )
}