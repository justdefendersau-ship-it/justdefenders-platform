// Timestamp: 14 March 2026 12:15
// Parts Reliability Intelligence API (Safe Version)

import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabaseServer"

export async function GET() {

  try {

    const supabase = getSupabaseServerClient()

    const { data, error } = await supabase
      .from("supplier_failure_stats")
      .select("*")
      .limit(10)

    if (error) {

      console.error("Parts reliability query error:", error)

      return NextResponse.json({
        parts: []
      })

    }

    const parts = (data || []).map((p: any) => ({

      part: p.component || p.part_name || "Part",
      supplier: p.supplier || p.supplier_name || "Supplier",
      failure_rate: Math.round(p.failure_rate || 0),
      life_years: Math.round((p.average_life_years || 0) * 10) / 10

    }))

    return NextResponse.json({ parts })

  } catch (err) {

    console.error("Parts reliability crash:", err)

    return NextResponse.json({
      parts: []
    })

  }

}