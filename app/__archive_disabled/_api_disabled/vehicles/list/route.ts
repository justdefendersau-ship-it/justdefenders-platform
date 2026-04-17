/*
========================================================
File: route.ts
Path: /app/api/vehicles/list/route.ts
Timestamp: 15 March 2026 15:30
Project: JustDefenders Vehicle Intelligence Platform

Description:
Returns vehicles belonging to the current user.

Source table:
vehicles

Fields returned:

vin
name
mileage
health_score

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

    return NextResponse.json({
      error:error.message
    },{ status:500 })

  }

  return NextResponse.json(data)

}