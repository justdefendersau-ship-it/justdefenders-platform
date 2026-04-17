// Timestamp 7 March 2026
// File: /app/api/org/create/route.ts

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {

  const body = await req.json()

  const { name } = body

  const { data } = await supabase
    .from("organizations")
    .insert({

      name

    })
    .select()
    .single()

  return NextResponse.json({

    organization: data

  })

}