// Timestamp 7 March 2026
// File: /app/api/ingest/fault-codes/route.ts

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {

  const body = await req.json()

  const {

    vin,
    fault_code,
    description,
    severity

  } = body

  await supabase
    .from("vehicle_fault_codes")
    .insert({

      vin,
      fault_code,
      description,
      severity

    })

  return NextResponse.json({

    message: "Fault code recorded"

  })

}