// Timestamp: 14 March 2026 13:15
// Parts Cross Reference API

import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabaseServer"

export async function GET(req: Request) {

  try {

    const supabase = getSupabaseServerClient()

    const { searchParams } = new URL(req.url)
    const part = searchParams.get("part") || ""

    const { data: supersessions } = await supabase
      .from("part_supersessions")
      .select("*")
      .eq("old_part", part)

    const { data: equivalents } = await supabase
      .from("part_cross_reference")
      .select("*")
      .eq("jlr_part", part)

    const { data: compatibility } = await supabase
      .from("parts_compatibility")
      .select("*")
      .eq("part_number", part)

    return NextResponse.json({
      supersessions: supersessions || [],
      equivalents: equivalents || [],
      compatibility: compatibility || []
    })

  } catch (err) {

    console.error(err)

    return NextResponse.json({
      supersessions: [],
      equivalents: [],
      compatibility: []
    })

  }

}