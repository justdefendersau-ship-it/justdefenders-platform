/*
Vehicle List API
Timestamp: 13 March 2026 22:05
Returns vehicles owned by the user
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
  .select(`
   vin,
   make,
   model,
   nickname,
   year
  `)
  .order("created_at",{ascending:false})

 if(error){

  return NextResponse.json(
   {error:error.message},
   {status:500}
  )

 }

 return NextResponse.json(data)

}