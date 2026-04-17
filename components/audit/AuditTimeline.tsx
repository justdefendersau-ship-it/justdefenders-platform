// =====================================================
// JustDefenders ©
// File: /components/audit/AuditTimeline.tsx
// Timestamp: 22 March 2026 13:10 (Sydney)
// Purpose: Timeline replay with step navigation
// =====================================================

"use client";

import { useState } from "react";
import AuditDiff from "./AuditDiff";

type Props = {
  logs: any[];
};

export default function AuditTimeline({ logs }: Props) {
  const [index, setIndex] = useState(0);

  if (!logs || logs.length === 0) return null;

  const log = logs[index];

  return (
    <div className="panel space-y-3">

      <div className="text-sm text-gray-400">
        Timeline Replay
      </div>

      {/* CONTROLS */}
      <div className="flex gap-2">
        <button
          onClick={() => setIndex(Math.max(index - 1, 0))}
          className="px-2 py-1 bg-gray-700 rounded"
        >
          ←
        </button>

        <button
          onClick={() =>
            setIndex(Math.min(index + 1, logs.length - 1))
          }
          className="px-2 py-1 bg-gray-700 rounded"
        >
          →
        </button>
      </div>

      {/* CURRENT STEP */}
      <div className="text-xs text-gray-500">
        {new Date(log.created_at).toLocaleString()}
      </div>

      <div className="text-sm">
        {log.action} {log.entity_type}
      </div>

      {/* DIFF */}
      <AuditDiff before={log.before} after={log.after} />

    </div>
  );
}