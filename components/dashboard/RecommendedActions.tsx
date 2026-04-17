// =====================================================
// JustDefenders ©
// File: RecommendedActions.tsx
// Timestamp: 22 March 2026 11:15 (Sydney)
// Purpose: Show supplier tier + boosted ranking
// =====================================================

import Link from "next/link";

type Props = {
  actions: any[];
};

export default function RecommendedActions({ actions }: Props) {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="panel mt-4">
      <div className="text-sm text-gray-400 mb-2">
        Recommended Actions
      </div>

      <div className="space-y-4 text-sm">

        {actions.map((a, index) => (
          <div key={index} className="space-y-2">

            {/* ACTION */}
            <div className="flex justify-between text-gray-300">
              <span>{a.message}</span>
              <span className="text-xs uppercase">{a.priority}</span>
            </div>

            {/* PARTS */}
            {a.parts && (
              <div className="ml-2 text-xs space-y-1">

                {a.parts.map((p: any, i: number) => {
                  const tierLabel =
                    p.supplier_score > 0.7
                      ? "🟡 Gold"
                      : p.supplier_score > 0.5
                      ? "⚪ Silver"
                      : "🟤 Bronze";

                  return (
                    <Link
                      key={i}
                      href={`/suppliers/${p.supplier_id}`}
                      className={`flex justify-between hover:opacity-80 ${
                        p.isBest
                          ? "font-semibold text-white"
                          : "text-gray-400"
                      }`}
                    >
                      <span>
                        {p.isBest && "⭐ "}
                        {p.name} ({p.supplier}) {tierLabel}
                      </span>
                      <span>
                        ${p.price} • {p.distance_km}km • ⭐{p.rating}
                      </span>
                    </Link>
                  );
                })}

              </div>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}