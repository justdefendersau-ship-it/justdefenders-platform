/*
========================================================
File: route.ts
Path: /app/api/core/vehicles/route.ts
Timestamp: 15 March 2026 16:05
Project: JustDefenders Vehicle Intelligence Platform

Description:
Returns vehicles belonging to the current user.

Safe API namespace:
app/api/core

This prevents legacy APIs from compiling.

JustDefenders ©
========================================================
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

  const { data, error } = await supabase
    .from("vehicles")
    .select("vin,name,mileage,health_score")
    .order("created_at",{ ascending:false })

  if(error){

    return NextResponse.json(
      { error:error.message },
      { status:500 }
    )

  }

  return NextResponse.json(data)

}