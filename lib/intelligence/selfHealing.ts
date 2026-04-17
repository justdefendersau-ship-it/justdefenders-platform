// =====================================================
// JustDefenders ©
// File: /lib/intelligence/selfHealing.ts
// Timestamp: 22 March 2026 13:30 (Sydney)
// Purpose: Self-healing decision engine
// =====================================================

import { createClient } from "@/lib/supabaseClient";
import { logAuditEvent } from "@/lib/audit/log";

export async function runSelfHealing(vehicleId: string, userId: string) {
  const supabase = createClient();

  // ----------------------------------
  // DETECT ANOMALY
  // ----------------------------------
  const { data } = await supabase.rpc("detect_vehicle_anomaly", {
    v_id: vehicleId,
  });

  if (!data?.anomaly) return;

  // ----------------------------------
  // CREATE ALERT
  // ----------------------------------
  await supabase.from("alerts").insert({
    vehicle_id: vehicleId,
    user_id: userId,
    message: data.message,
    severity: data.severity,
    is_predictive: true,
    status: "active",
  });

  // ----------------------------------
  // OPTIONAL AUTO-ROLLBACK (SAFE MODE)
  // ----------------------------------
  if (data.severity === "high") {
    console.log("High severity anomaly detected");
    // could trigger restore suggestion instead of auto-restore
  }

  // ----------------------------------
  // AUDIT
  // ----------------------------------
  await logAuditEvent({
    userId,
    orgId: null,
    entityType: "vehicle",
    entityId: vehicleId,
    action: "anomaly_detected",
    after: data,
  });
}