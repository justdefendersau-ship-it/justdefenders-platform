// =====================================================
// JustDefenders ©
// File: /app/api/member/vehicles/route.ts
// Timestamp: 22 March 2026 22:05 (Sydney)
// Purpose: FIX SUPABASE CLIENT IMPORT + VEHICLE API
// =====================================================

import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabaseServer";

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();

    // TODO: replace with real auth later
    const userId = "3453ac80-d993-4738-9c4c-974c42e5f37a";

    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ vehicles: data || [] });
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}