// =====================================================
// JustDefenders ©
// File: /app/org/audit/page.tsx
// Timestamp: 22 March 2026 13:15 (Sydney)
// Purpose: Audit logs with diff + timeline
// =====================================================

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";

import AuditDiff from "@/components/audit/AuditDiff";
import AuditTimeline from "@/components/audit/AuditTimeline";

export default function AuditPage() {
  const supabase = createClient();

  const [logs, setLogs] = useState<any[]>([]);

  async function fetchLogs() {
    const { data } = await supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    setLogs(data || []);
  }

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Audit Logs
      </h1>

      {/* TIMELINE */}
      <AuditTimeline logs={logs} />

      {/* LOG LIST */}
      <div className="panel space-y-3 text-sm">

        {logs.map((log: any) => (
          <div key={log.id} className="border-b border-gray-800 pb-3">

            <div className="text-xs text-gray-500">
              {new Date(log.created_at).toLocaleString()}
            </div>

            <div>
              <span className="font-semibold">
                {log.action}
              </span>{" "}
              {log.entity_type}
            </div>

            <AuditDiff before={log.before} after={log.after} />

          </div>
        ))}

      </div>

    </div>
  );
}