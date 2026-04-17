/*
=====================================================
SOC2 AUDIT LOGGER
Timestamp: 26 Feb 2026 23:10
=====================================================
*/

import { createClient } from "@supabase/supabase-js"

export async function soc2Log(
  organizationId: string,
  userId: string,
  category: string,
  eventType: string,
  metadata: any,
  request: Request
) {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  await supabase.from("platform_audit_log").insert({
    organization_id: organizationId,
    user_id: userId,
    event_category: category,
    event_type: eventType,
    ip_address: request.headers.get("x-forwarded-for") || "",
    user_agent: request.headers.get("user-agent") || "",
    event_metadata: metadata
  })
}