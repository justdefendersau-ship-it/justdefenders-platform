// JustDefenders ©
// File: /components/dashboard/MyVehicles.tsx
// Timestamp: 29 March 2026 20:56 (Sydney)
// PURPOSE: MY VEHICLES (SUPABASE DATA INTEGRATION)

import { createSupabaseServerClient } from "@/lib/supabaseServer";

export default async function MyVehicles() {
  const supabase = createSupabaseServerClient();

  const { data: vehicles, error } = await supabase
    .from("vehicles")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) {
    return <div>Error loading vehicles</div>;
  }

  return (
    <div>
      <h2 className="font-semibold mb-2">
        My Vehicles
      </h2>

      <ul className="space-y-1 text-sm">
        {vehicles?.map((vehicle) => (
          <li key={vehicle.id}>
            {vehicle.name}
          </li>
        ))}
      </ul>
    </div>
  );
}