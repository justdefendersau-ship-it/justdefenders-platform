// JustDefenders ©
// File: /components/dashboard/RecentActivity.tsx
// Timestamp: 29 March 2026 21:50 (Sydney)
// PURPOSE: USE REAL VEHICLE FIELDS (MAKE + MODEL)

import { createSupabaseServerClient } from "@/lib/supabaseServer";

export default async function RecentActivity() {
  const supabase = createSupabaseServerClient();

  const { data: activity, error: activityError } = await supabase
    .from("activity_logs")
    .select("id, description, vehicle_id, created_at")
    .order("created_at", { ascending: false })
    .limit(10);

  const { data: vehicles, error: vehicleError } = await supabase
    .from("vehicles")
    .select("id, make, model_id");

  if (activityError) {
    return <div>Activity Error: {activityError.message}</div>;
  }

  if (vehicleError) {
    return <div>Vehicle Error: {vehicleError.message}</div>;
  }

  const vehicleMap: Record<string, string> = {};

  vehicles?.forEach((v: any) => {
    vehicleMap[v.id] = `${v.make} ${v.model_id ?? ""}`;
  });

  return (
    <div>
      <h2 className="font-semibold mb-3">
        Recent Activity
      </h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-1">Description</th>
            <th className="py-1">Vehicle</th>
            <th className="py-1">Date</th>
          </tr>
        </thead>

        <tbody>
          {activity?.map((item: any) => (
            <tr key={item.id} className="border-b">
              <td className="py-1">{item.description}</td>
              <td className="py-1">
                {vehicleMap[item.vehicle_id] || "—"}
              </td>
              <td className="py-1">
                {new Date(item.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}