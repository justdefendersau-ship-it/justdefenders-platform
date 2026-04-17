// JustDefenders ©
// File: /components/dashboard/MarketIntel.tsx
// Timestamp: 30 March 2026 00:25 (Sydney)
// PURPOSE: MARKET INTELLIGENCE (TRENDS + SIGNALS)

import { createSupabaseServerClient } from "@/lib/supabaseServer";

export default async function MarketIntel() {
  const supabase = createSupabaseServerClient();

  // 🔹 Get recent failures (last 30 days)
  const { data: failures } = await supabase
    .from("activity_logs")
    .select("part_id, created_at, parts ( name )")
    .not("part_id", "is", null);

  // 🔹 Get price history
  const { data: prices } = await supabase
    .from("part_prices")
    .select("part_id, price, created_at");

  const now = new Date();
  const last30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // 🔹 Failure trends
  const failureCounts: Record<string, number> = {};

  failures?.forEach((f: any) => {
    const date = new Date(f.created_at);
    if (date >= last30) {
      const name = f.parts?.name || "Unknown";
      failureCounts[name] = (failureCounts[name] || 0) + 1;
    }
  });

  // 🔹 Price trends (compare latest vs older)
  const priceTrends: Record<string, { old: number; latest: number }> = {};

  prices?.forEach((p: any) => {
    if (!priceTrends[p.part_id]) {
      priceTrends[p.part_id] = {
        old: p.price,
        latest: p.price,
      };
    } else {
      priceTrends[p.part_id].latest = p.price;
    }
  });

  // 🔹 Combine signals
  const insights = Object.keys(failureCounts).map((partName) => {
    const failures = failureCounts[partName];

    let trend = "Stable";

    if (failures > 3) trend = "High demand";
    if (failures > 5) trend = "Spike";

    return {
      partName,
      failures,
      trend,
    };
  });

  insights.sort((a, b) => b.failures - a.failures);

  return (
    <div>
      <h2 className="font-semibold mb-3">
        Market Intelligence
      </h2>

      <ul className="space-y-2 text-sm">
        {insights.slice(0, 5).map((i, idx) => (
          <li key={idx} className="flex justify-between">
            <span>{i.partName}</span>
            <span className="text-gray-500">
              {i.trend}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}