/*
My Vehicles Dashboard API
Timestamp: 13 March 2026 17:34
Returns vehicles for dashboard quick access
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
.select("id,vin,nickname,make,model,year,image_url")
.order("created_at",{ascending:false})
.limit(6)

if(error){

return NextResponse.json({error:error.message},{status:500})

}

return NextResponse.json(data || [])

}