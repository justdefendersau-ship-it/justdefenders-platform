// =====================================================
// JustDefenders ©
// File: /app/api/vehicle-health/[vin]/route.ts
// Timestamp: 22 March 2026 17:40 (Sydney)
// Purpose: Vehicle health history API (VIN-based)
// =====================================================

import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabaseServer";

export async function GET(
  req: NextRequest,
  { params }: { params: { vin: string } }
) {
  const supabase = createServerSupabaseClient();

  // --------------------------------------------------
  // GET VEHICLE BY VIN (FIRST)
  // --------------------------------------------------
  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("id")
    .eq("vin", params.vin)
    .single();

  if (!vehicle) {
    return NextResponse.json([]);
  }

  // --------------------------------------------------
  // GET HEALTH HISTORY USING VEHICLE ID
  // --------------------------------------------------
  const { data } = await supabase
    .from("vehicle_health_history")
    .select("health_score, recorded_at")
    .eq("vehicle_id", vehicle.id)
    .order("recorded_at", { ascending: true })
    .limit(20);

  return NextResponse.json(data || []);
}