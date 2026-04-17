/*
=====================================================
AUDIT LOGGER (SERVER SAFE)
=====================================================
*/

import { createClient } from "@supabase/supabase-js"

export async function logAuditEvent(
  organizationId: string,
  userId: string,
  eventType: string,
  metadata: any
) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  await supabase.from("platform_audit_log").insert({
    organization_id: organizationId,
    user_id: userId,
    event_type: eventType,
    event_metadata: metadata
  })
}