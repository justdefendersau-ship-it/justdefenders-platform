/*
Timestamp: 5 March 2026 11:58
File: app/api/platform/tenant-context/route.ts

Tenant Context API

Purpose
-------
Returns user and organization context for the multi-tenant platform.

Enhancement
-----------
Corporate suffixes are removed from organization names
so community groups do not display as companies.

Example
-------
"JustDefenders Pty Ltd" -> "JustDefenders"
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function sanitizeOrgName(name: string) {

  return name
    .replace(/pty ltd/i, "")
    .replace(/ltd/i, "")
    .replace(/limited/i, "")
    .replace(/inc/i, "")
    .replace(/llc/i, "")
    .trim()

}

export async function GET() {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id,email,role,organization_id")

  const { data: organizations } = await supabase
    .from("organizations")
    .select("id,name,subscription_tier")

  const cleanedOrganizations = organizations?.map(org => ({
    ...org,
    name: sanitizeOrgName(org.name)
  })) || []

  return NextResponse.json({
    users: profiles || [],
    organizations: cleanedOrganizations
  })

}