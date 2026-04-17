/*
=====================================================
NEW ORG ONBOARDING
Timestamp: 26 Feb 2026 22:15
=====================================================
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {

  const { userId, orgName } = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: org } = await supabase
    .from("organizations")
    .insert({ name: orgName })
    .select()
    .single()

  await supabase
    .from("profiles")
    .update({ organization_id: org.id })
    .eq("id", userId)

  await supabase
    .from("subscriptions")
    .insert({ organization_id: org.id })

  return NextResponse.json({ success: true })
}