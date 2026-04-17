// =====================================================
// JustDefenders ©
// File: /app/api/audit/restore/route.ts
// Timestamp: 22 March 2026 12:42 (Sydney)
// Purpose: Restore entity from audit log
// =====================================================

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";
import { logAuditEvent } from "@/lib/audit/log";

export async function POST(req: NextRequest) {
  const supabase = createClient();

  const body = await req.json();
  const { log_id } = body;

  // get audit record
  const { data: log } = await supabase
    .from("audit_logs")
    .select("*")
    .eq("id", log_id)
    .single();

  if (!log) {
    return NextResponse.json({ error: "Log not found" }, { status: 404 });
  }

  // restore
  await supabase.rpc("restore_vehicle_from_audit", {
    log_id,
  });

  // log restore action
  await logAuditEvent({
    userId: log.user_id,
    orgId: log.organisation_id,
    entityType: log.entity_type,
    entityId: log.entity_id,
    action: "restore",
  });

  return NextResponse.json({ success: true });
}