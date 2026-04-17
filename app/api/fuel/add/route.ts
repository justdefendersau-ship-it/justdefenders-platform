// =====================================================
// JustDefenders ©
// File: /app/api/fuel/add/route.ts
// Timestamp: 22 March 2026 15:00 (Sydney)
// Purpose: Add fuel log with full debug + safe mapping
// =====================================================

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  const supabase = createClient();

  // ----------------------------------------------------
  // AUTH
  // ----------------------------------------------------
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // ----------------------------------------------------
    // BODY (RAW)
    // ----------------------------------------------------
    const body = await req.json();

    console.log("FUEL BODY (RAW):", body);

    // ----------------------------------------------------
    // VERIFY FIELDS (CRITICAL DEBUG)
    // ----------------------------------------------------
    console.log("FUEL FIELD CHECK:", {
      latitude: body.latitude,
      longitude: body.longitude,
      brand: body.brand,
      location_name: body.location_name,
    });

    // ----------------------------------------------------
    // BUILD INSERT (SAFE + EXPLICIT)
    // ----------------------------------------------------
    const insertData = {
      user_id: user.id,
      vehicle_id: body.vehicle_id,

      litres: body.litres,
      cost: body.cost,
      total_cost: body.cost,

      odometer: body.odometer,
      fuel_type: body.fuel_type || "diesel",

      latitude: body.latitude ?? null,
      longitude: body.longitude ?? null,

      location_name: body.location_name ?? null,

      brand: body.brand ?? null,
      fuel_station: body.fuel_station ?? null,

      city: body.city ?? null,
      country_code: body.country_code ?? null,

      price_per_litre:
        body.litres && body.cost
          ? body.cost / body.litres
          : null,

      cents_per_litre:
        body.litres && body.cost
          ? Math.round((body.cost / body.litres) * 100)
          : null,

      full_tank: body.full_tank ?? true,

      created_at: new Date().toISOString(),
    };

    console.log("FINAL INSERT DATA:", insertData);

    // ----------------------------------------------------
    // INSERT
    // ----------------------------------------------------
    const { error } = await supabase
      .from("fuel_logs")
      .insert(insertData);

    if (error) {
      console.error("FUEL INSERT ERROR:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("FUEL API ERROR:", err);
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}