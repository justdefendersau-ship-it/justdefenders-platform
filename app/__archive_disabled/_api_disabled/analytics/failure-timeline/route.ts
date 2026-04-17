import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

const { data } = await supabase
.from("component_failure_stats")
.select("last_updated,failure_count")

const timeline:any = {}

data?.forEach((f:any)=>{

const d = new Date(f.last_updated)
const key = `${d.getFullYear()}-${d.getMonth()+1}`

timeline[key] = (timeline[key]||0) + (f.failure_count||0)

})

const chart = Object.keys(timeline).map(k=>({

date:k,
failures:timeline[k]

}))

chart.sort((a,b)=>a.date.localeCompare(b.date))

return NextResponse.json({

timeline:chart

})

}