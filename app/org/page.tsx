// =====================================================
// JustDefenders ©
// File: /app/org/audit/page.tsx
// Timestamp: 22 March 2026 12:50 (Sydney)
// Purpose: Audit log viewer with restore capability
// =====================================================

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";

export default function AuditPage() {
  const supabase = createClient();

  const [logs, setLogs] = useState<any[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // ----------------------------------------------------
  // FETCH LOGS
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // RESTORE HANDLER
  // ----------------------------------------------------
  async function handleRestore(logId: string) {
    setLoadingId(logId);

    try {
      await fetch("/api/audit/restore", {
        method: "POST",
        body: JSON.stringify({ log_id: logId }),
      });

      // refresh logs after restore
      await fetchLogs();
    } catch (err) {
      console.error("Restore failed:", err);
    }

    setLoadingId(null);
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          Audit Logs
        </h1>
        <div className="text-sm text-gray-400">
          Track changes and restore previous states
        </div>
      </div>

      {/* LOG LIST */}
      <div className="panel space-y-3 text-sm">

        {logs.length === 0 && (
          <div className="text-gray-500 text-xs">
            No audit logs found
          </div>
        )}

        {logs.map((log: any) => (
          <div
            key={log.id}
            className="border-b border-gray-800 pb-3 space-y-1"
          >

            {/* TIMESTAMP */}
            <div className="text-xs text-gray-500">
              {new Date(log.created_at).toLocaleString()}
            </div>

            {/* ACTION */}
            <div>
              <span className="font-semibold">
                {log.action}
              </span>{" "}
              {log.entity_type}
            </div>

            {/* USER */}
            <div className="text-xs text-gray-500">
              User: {log.user_id}
            </div>

            {/* RESTORE BUTTON */}
            {log.before && (
              <button
                onClick={() => handleRestore(log.id)}
                disabled={loadingId === log.id}
                className="text-xs text-blue-400 hover:underline disabled:opacity-50"
              >
                {loadingId === log.id
                  ? "Restoring..."
                  : "Restore"}
              </button>
            )}

          </div>
        ))}

      </div>

    </div>
  );
}