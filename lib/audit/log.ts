// =====================================================
// JustDefenders ©
// File: /lib/audit/log.ts
// Timestamp: 22 March 2026 12:36 (Sydney)
// Purpose: Audit logging with before/after state
// =====================================================

import { createClient } from "@/lib/supabaseClient";

export async function logAuditEvent({
  userId,
  orgId,
  entityType,
  entityId,
  action,
  before,
  after,
}: {
  userId: string;
  orgId: string;
  entityType: string;
  entityId: string;
  action: string;
  before?: any;
  after?: any;
}) {
  const supabase = createClient();

  const { error } = await supabase.from("audit_logs").insert({
    user_id: userId,
    organisation_id: orgId,
    entity_type: entityType,
    entity_id: entityId,
    action,
    before: before || null,
    after: after || null,
  });

  if (error) {
    console.error("Audit log error:", error);
  }
}