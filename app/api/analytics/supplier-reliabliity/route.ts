// Timestamp: 14 March 2026
// JustDefenders Supplier Reliability Score Engine

import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/*
Reliability Score Formula
*/

function calculateReliabilityScore(metrics:any){

 const deliverySuccess = metrics.delivery_success_rate || 0
 const delay = metrics.avg_delivery_delay_days || 0
 const priceVolatility = metrics.price_volatility || 0
 const rating = metrics.customer_rating || 0
 const warranty = metrics.warranty_claim_rate || 0

 const delayScore = Math.max(0,100-(delay*10))
 const volatilityScore = Math.max(0,100-(priceVolatility*100))
 const warrantyScore = Math.max(0,100-(warranty*100))

 const score =
   deliverySuccess * 0.4 +
   delayScore * 0.2 +
   volatilityScore * 0.15 +
   rating * 20 * 0.15 +
   warrantyScore * 0.1

 return Math.round(score)
}


export async function GET(req:NextRequest){

 try{

   const { data:suppliers } = await supabase
     .from("suppliers")
     .select("id,name,country")

   const { data:metrics } = await supabase
     .from("supplier_metrics")
     .select("*")

   const results = suppliers?.map(supplier=>{

     const m = metrics?.find(
       x=>x.supplier_id === supplier.id
     )

     const score = m
       ? calculateReliabilityScore(m)
       : 50

     return {

       supplier_id:supplier.id,
       supplier_name:supplier.name,
       country:supplier.country,

       reliability_score:score,

       delivery_success_rate:m?.delivery_success_rate || null,
       avg_delivery_delay_days:m?.avg_delivery_delay_days || null,
       customer_rating:m?.customer_rating || null

     }

   })


   results?.sort(
     (a,b)=>b.reliability_score - a.reliability_score
   )

   return NextResponse.json({

     suppliers:results

   })


 }catch(err:any){

   return NextResponse.json({

     error:err.message

   })

 }

}