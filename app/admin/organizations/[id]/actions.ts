/*
Timestamp: 5 March 2026 16:05
File: app/admin/organizations/[id]/actions.ts

Purpose
-------
Server actions for organization management.

Currently supports:
- updating organization subscription tier
*/

"use server"

import { createClient } from "@supabase/supabase-js"

export async function updateOrganizationTier(
  organizationId: string,
  newTier: string
) {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error } = await supabase
    .from("organizations")
    .update({
      subscription_tier: newTier
    })
    .eq("id", organizationId)

  if (error) {

    console.error("Failed to update organization:", error)
    throw new Error("Organization update failed")

  }

  return { success: true }

}