// =====================================================
// JustDefenders ©
// File: /lib/audit/log.ts
// Purpose: Central audit logging helper
// =====================================================

import { createClient } from "@/lib/supabaseClient";

export async function logAuditEvent({
  userId,
  orgId,
  entityType,
  entityId,
  action,
  changes,
}: {
  userId: string;
  orgId: string;
  entityType: string;
  entityId: string;
  action: string;
  changes?: any;
}) {
  const supabase = createClient();

  const { error } = await supabase.from("audit_logs").insert({
    user_id: userId,
    organisation_id: orgId,
    entity_type: entityType,
    entity_id: entityId,
    action,
    changes: changes || null,
  });

  if (error) {
    console.error("Audit log error:", error);
  }
}