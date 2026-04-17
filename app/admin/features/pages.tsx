"use client"

/*
=====================================================
Feature Admin Page
Timestamp: 24 Feb 2026 16:30
Admin-only access enforcement
=====================================================
*/

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

export default function FeatureAdmin() {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [flags, setFlags] = useState<any[]>([])
  const [organizationId, setOrganizationId] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    if (!profile) return

    if (profile.role !== "admin") return

    setIsAdmin(true)
    setOrganizationId(profile.organization_id)

    const { data } = await supabase
      .from("feature_flags")
      .select("*")
      .eq("organization_id", profile.organization_id)

    setFlags(data || [])
  }

  async function toggle(feature: string, current: boolean) {
    await supabase
      .from("feature_flags")
      .upsert({
        organization_id: organizationId,
        feature_name: feature,
        enabled: !current
      })

    load()
  }

  if (!isAdmin) {
    return <div style={{ padding: 40 }}>Access restricted to administrators.</div>
  }

  const features = [
    "advanced_risk",
    "underwriting_mode",
    "invoice_upload"
  ]

  return (
    <div style={{ padding: 40 }}>
      <h1>Feature Management</h1>

      {features.map(feature => {
        const existing = flags.find(f => f.feature_name === feature)
        const enabled = existing?.enabled ?? false

        return (
          <div key={feature} style={{ marginBottom: 10 }}>
            <strong>{feature}</strong>
            <button
              style={{ marginLeft: 20 }}
              onClick={() => toggle(feature, enabled)}
            >
              {enabled ? "Disable" : "Enable"}
            </button>
          </div>
        )
      })}
    </div>
  )
}