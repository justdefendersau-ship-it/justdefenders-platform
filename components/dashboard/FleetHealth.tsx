// JustDefenders ©
// File: /components/dashboard/FleetHealth.tsx
// Timestamp: 29 March 2026 23:10 (Sydney)
// PURPOSE: DEDUP BY VIN (TRUE VEHICLE IDENTITY)

import { createSupabaseServerClient } from "@/lib/supabaseServer";

type VehicleHealth = {
  vin: string;
  name: string;
  score: number;
};

export default async function FleetHealth() {
  const supabase = createSupabaseServerClient();

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("id, make, vin");

  const { data: activity } = await supabase
    .from("activity_logs")
    .select("vehicle_id, description, created_at");

  const { data: fuelLogs } = await supabase
    .from("fuel_logs")
    .select("vehicle_id, odometer, litres, created_at")
    .order("created_at", { ascending: false });

  // 🔥 GROUP VEHICLES BY VIN
  const vehiclesByVin = new Map<string, any[]>();

  vehicles?.forEach((v: any) => {
    if (!v.vin) return;

    if (!vehiclesByVin.has(v.vin)) {
      vehiclesByVin.set(v.vin, []);
    }

    vehiclesByVin.get(v.vin)!.push(v);
  });

  const results: VehicleHealth[] = [];

  vehiclesByVin.forEach((vehicleGroup, vin) => {
    let score = 100;

    const shortVin = vin.slice(-6);
    const name = `${vehicleGroup[0].make} (${shortVin})`;

    // Collect ALL IDs for this VIN
    const vehicleIds = vehicleGroup.map((v: any) => v.id);

    // 🔹 FILTER ACTIVITY ACROSS DUPLICATES
    const vehicleActivity = activity?.filter((a: any) =>
      vehicleIds.includes(a.vehicle_id)
    );

    const vehicleFuel = fuelLogs?.filter((f: any) =>
      vehicleIds.includes(f.vehicle_id)
    );

    // 🔴 FAULT PENALTY
    vehicleActivity?.forEach((entry: any) => {
      const desc = entry.description?.toLowerCase() || "";
      if (desc.includes("failure") || desc.includes("fault")) {
        score -= 25;
      }
    });

    // 🟡 SERVICE PENALTY
    const now = new Date();

    vehicleActivity?.forEach((entry: any) => {
      if (entry.description?.toLowerCase().includes("service")) {
        const lastService = new Date(entry.created_at);
        const diffDays =
          (now.getTime() - lastService.getTime()) /
          (1000 * 60 * 60 * 24);

        if (diffDays > 180) {
          score -= 15;
        }
      }
    });

    // 🟡 FUEL PENALTY
    if (vehicleFuel && vehicleFuel.length > 2) {
      const efficiencies: number[] = [];

      for (let i = 0; i < vehicleFuel.length - 1; i++) {
        const current = vehicleFuel[i];
        const previous = vehicleFuel[i + 1];

        const distance = current.odometer - previous.odometer;

        if (distance > 0 && current.litres > 0) {
          efficiencies.push(distance / current.litres);
        }
      }

      if (efficiencies.length > 2) {
        const avg =
          efficiencies.reduce((a, b) => a + b, 0) /
          efficiencies.length;

        const latest = efficiencies[0];

        if (latest < avg * 0.7) score -= 15;
        if (latest < avg * 0.5) score -= 25;
      }
    }

    score = Math.max(0, Math.min(100, score));

    results.push({
      vin,
      name,
      score,
    });
  });

  // 🔹 SORT WORST FIRST
  results.sort((a, b) => a.score - b.score);

  return (
    <div>
      <h2 className="font-semibold mb-3">
        Fleet Health
      </h2>

      <ul className="space-y-2 text-sm">
        {results.map((v) => (
          <li key={v.vin} className="flex justify-between">
            <span>{v.name}</span>
            <span
              className={
                v.score < 60
                  ? "text-red-600"
                  : v.score < 80
                  ? "text-yellow-600"
                  : "text-green-600"
              }
            >
              {v.score}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}