/*
Navbar Stats API
Timestamp: 13 March 2026 18:06
Returns vehicle count and alert count
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

const { count:vehicleCount } = await supabase
.from("vehicles")
.select("*",{count:"exact",head:true})

const { count:alertCount } = await supabase
.from("reliability_alerts")
.select("*",{count:"exact",head:true})

return NextResponse.json({

vehicles:vehicleCount || 0,
alerts:alertCount || 0

})

}