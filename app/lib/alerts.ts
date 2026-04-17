/*
=====================================================
RISK ALERT ENGINE
=====================================================
*/

import { createClient } from "@supabase/supabase-js"

export async function createRiskAlert(
  organizationId: string,
  message: string,
  severity: string
) {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  await supabase.from("risk_alerts").insert({
    organization_id: organizationId,
    alert_type: "risk",
    message,
    severity
  })
}