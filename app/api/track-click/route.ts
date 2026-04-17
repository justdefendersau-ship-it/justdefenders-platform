// =====================================================
// JustDefenders ©
// File: /app/api/track-click/route.ts
// Timestamp: 22 March 2026 10:05 (Sydney)
// Purpose: API route to track supplier interactions (visit / buy)
// =====================================================

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();

    const body = await req.json();

    const { supplier_id, action } = body;

    // ----------------------------------------------------
    // GET USER
    // ----------------------------------------------------
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userId = user?.id || null;

    // ----------------------------------------------------
    // INSERT TRACKING EVENT
    // ----------------------------------------------------
    const { error } = await supabase.from("supplier_clicks").insert({
      supplier_id,
      user_id: userId,
      action,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Track click error:", error);
      return NextResponse.json(
        { success: false },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Track click exception:", err);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}