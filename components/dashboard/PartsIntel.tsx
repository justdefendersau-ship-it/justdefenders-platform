// JustDefenders ©
// File: /components/dashboard/PartsIntel.tsx
// Timestamp: 30 March 2026 00:15 (Sydney)
// PURPOSE: SUPPLIER RANKING (NORMALISED 0–100 SCORE)

import { createSupabaseServerClient } from "@/lib/supabaseServer";

export default async function PartsIntel() {
  const supabase = createSupabaseServerClient();

  const { data: failures } = await supabase
    .from("activity_logs")
    .select("part_id, parts ( id, name )")
    .not("part_id", "is", null);

  const { data: prices } = await supabase
    .from("part_prices")
    .select("part_id, price, supplier_id");

  const { data: suppliers } = await supabase
    .from("suppliers")
    .select("id, name, rating");

  // 🔹 Supplier lookup
  const supplierMap: Record<string, any> = {};
  suppliers?.forEach((s: any) => {
    supplierMap[s.id] = s;
  });

  // 🔹 Count failures
  const counts: Record<string, number> = {};
  failures?.forEach((f: any) => {
    const name = f.parts?.name || "Unknown";
    counts[name] = (counts[name] || 0) + 1;
  });

  // 🔹 Group prices per part
  const partSuppliers: Record<string, any[]> = {};

  prices?.forEach((p: any) => {
    if (!partSuppliers[p.part_id]) {
      partSuppliers[p.part_id] = [];
    }

    partSuppliers[p.part_id].push({
      price: p.price,
      supplier: supplierMap[p.supplier_id],
    });
  });

  const results = Object.entries(partSuppliers).map(
    ([partId, supplierList]: any) => {
      const part = failures?.find((f: any) => f.part_id === partId);
      const partName = part?.parts?.name || "Unknown";

      const minPrice = Math.min(...supplierList.map((s: any) => s.price));

      const ranked = supplierList.map((s: any) => {
        // 💰 Price score (0–60)
        const priceScore = (minPrice / s.price) * 60;

        // ⭐ Rating score (0–40)
        const rating = s.supplier?.rating || 3;
        const ratingScore = (rating / 5) * 40;

        // 🔢 Total (0–100)
        let totalScore = priceScore + ratingScore;
        totalScore = Math.round(Math.min(100, totalScore));

        return {
          name: s.supplier?.name || "Unknown",
          price: s.price,
          score: totalScore,
        };
      });

      ranked.sort((a: any, b: any) => b.score - a.score);

      return {
        partName,
        failures: counts[partName] || 0,
        suppliers: ranked.slice(0, 3),
      };
    }
  );

  return (
    <div>
      <h2 className="font-semibold mb-3">
        Parts Intelligence
      </h2>

      <div className="space-y-3 text-sm">
        {results.map((part: any, i: number) => (
          <div key={i} className="border-b pb-2">

            <div className="flex justify-between font-medium">
              <span>{part.partName}</span>
              <span>{part.failures} failures</span>
            </div>

            {part.suppliers.map((s: any, j: number) => (
              <div
                key={j}
                className="text-xs flex justify-between text-gray-600"
              >
                <span>{s.name}</span>
                <span>${s.price} — Score {s.score}</span>
              </div>
            ))}

          </div>
        ))}
      </div>
    </div>
  );
}