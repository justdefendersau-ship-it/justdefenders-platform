// =====================================================
// JustDefenders ©
// File: /components/audit/AuditDiff.tsx
// Timestamp: 22 March 2026 13:00 (Sydney)
// Purpose: Visual diff (before vs after)
// =====================================================

"use client";

type Props = {
  before?: any;
  after?: any;
};

export default function AuditDiff({ before, after }: Props) {
  if (!before && !after) return null;

  const keys = Array.from(
    new Set([
      ...Object.keys(before || {}),
      ...Object.keys(after || {}),
    ])
  );

  return (
    <div className="mt-2 text-xs space-y-1">

      {keys.map((key) => {
        const b = before?.[key];
        const a = after?.[key];

        const changed = JSON.stringify(b) !== JSON.stringify(a);

        let color = "text-gray-400";
        if (changed) color = "text-yellow-400";
        if (b === undefined) color = "text-green-400";
        if (a === undefined) color = "text-red-400";

        return (
          <div key={key} className="flex justify-between">

            <span className={color}>{key}</span>

            <span className="text-gray-500">
              {b !== undefined ? String(b) : "—"} →{" "}
              {a !== undefined ? String(a) : "—"}
            </span>

          </div>
        );
      })}

    </div>
  );
}