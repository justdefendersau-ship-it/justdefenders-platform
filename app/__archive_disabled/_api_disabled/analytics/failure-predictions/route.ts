// Timestamp: 14 March 2026
// JustDefenders AI Parts Failure Probability Engine
// VIN-Level Predictive Maintenance

import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/*
Failure Probability Model
*/

function calculateFailureProbability(
 vehicleKm:number,
 avgFailureKm:number,
 stdDev:number,
 historicalFailureRate:number,
 replacedKm:number | null
){

 let wearFactor = vehicleKm / avgFailureKm

 let timeSinceReplacement = 1

 if(replacedKm){

   timeSinceReplacement =
     (vehicleKm - replacedKm) / avgFailureKm

 }

 const varianceFactor = stdDev
   ? Math.abs(vehicleKm - avgFailureKm) / stdDev
   : 1

 const probability =
   (wearFactor * 0.4) +
   (timeSinceReplacement * 0.3) +
   (historicalFailureRate * 0.2) +
   (varianceFactor * 0.1)

 return Math.min(
   1,
   Math.max(0, probability)
 )

}

export async function GET(req:NextRequest){

 try{

   const { searchParams } = new URL(req.url)

   const vin = searchParams.get("vin")

   if(!vin){

     return NextResponse.json({
       error:"VIN required"
     })

   }

   /*
   STEP 1
   Load vehicle
   */

   const { data:vehicle } = await supabase
     .from("vehicles")
     .select("*")
     .eq("vin", vin)
     .single()

   if(!vehicle){

     return NextResponse.json({
       error:"Vehicle not found"
     })

   }

   const vehicleKm = vehicle.odometer_km || 0

   /*
   STEP 2
   Load failure stats
   */

   const { data:stats } = await supabase
     .from("parts_failure_stats")
     .select("*")

   /*
   STEP 3
   Load maintenance history
   */

   const { data:maintenance } = await supabase
     .from("maintenance_records")
     .select("*")
     .eq("vin", vin)

   const predictions = []

   for(const part of stats || []){

     const replacement = maintenance?.find(
       m=>m.part_id === part.part_id
     )

     const replacedKm = replacement
       ? replacement.odometer_km
       : null

     const probability = calculateFailureProbability(

       vehicleKm,
       part.avg_failure_km,
       part.failure_std_dev,
       part.historical_failure_rate,
       replacedKm

     )

     predictions.push({

       part_id:part.part_id,

       probability,

       avg_failure_km:part.avg_failure_km,

       vehicle_km:vehicleKm,

       predicted_window:

         Math.round(
           part.avg_failure_km * (1-probability)
         )

     })

   }

   predictions.sort(
     (a,b)=>b.probability - a.probability
   )

   return NextResponse.json({

     vin,
     vehicle_km:vehicleKm,
     predictions

   })

 }catch(err:any){

   return NextResponse.json({

     error:err.message

   })

 }

}