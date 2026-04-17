// =====================================================
// JustDefenders ©
// File: /lib/data/dashboard.ts
// Timestamp: 22 March 2026 18:10 (Sydney)
// Purpose: COMPLETE dashboard data layer (ALL EXPORTS FIXED)
// =====================================================

import "server-only";

import { createServerSupabaseClient } from "@/lib/supabaseServer";

// -----------------------------------------------------
// VEHICLES + HEALTH (ENRICHED)
// -----------------------------------------------------
export async function getVehiclesWithHealth(userId: string) {
  const supabase = createServerSupabaseClient();

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*")
    .eq("user_id", userId);

  if (!vehicles) return [];

  return vehicles.map((v) => {
    let status = "Good";
    let color = "text-green-400";

    if ((v.health_score ?? 100) < 50) {
      status = "Critical";
      color = "text-red-400";
    } else if ((v.health_score ?? 100) < 75) {
      status = "Warning";
      color = "text-yellow-400";
    }

    return {
      ...v,
      status,
      color,
    };
  });
}

// -----------------------------------------------------
// ACTIVITY LOGS (FIXED EXPORT)
// -----------------------------------------------------
export async function getActivityLogs(userId: string) {
  const supabase = createServerSupabaseClient();

  const { data } = await supabase
    .from("activity_logs")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(10);

  return data || [];
}

// -----------------------------------------------------
// ALERTS (ENRICHED)
// -----------------------------------------------------
export async function getAlerts(userId: string) {
  const supabase = createServerSupabaseClient();

  const { data } = await supabase
    .from("alerts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(10);

  if (!data) return [];

  return data.map((a) => ({
    ...a,
    label:
      a.severity === "high"
        ? "Critical"
        : a.severity === "medium"
        ? "Warning"
        : "Info",
  }));
}

// -----------------------------------------------------
// NETWORK EVENTS (SAFE PLACEHOLDER)
// -----------------------------------------------------
export async function getNetworkEvents() {
  return [
    {
      message: "No active network alerts",
      time: "now",
    },
  ];
}

// -----------------------------------------------------
// VEHICLE HEALTH HISTORY
// -----------------------------------------------------
export async function getVehicleHealthHistory(vehicleId: string) {
  const supabase = createServerSupabaseClient();

  const { data } = await supabase
    .from("vehicle_health_history")
    .select("health_score, recorded_at")
    .eq("vehicle_id", vehicleId)
    .order("recorded_at", { ascending: true })
    .limit(20);

  return data || [];
}