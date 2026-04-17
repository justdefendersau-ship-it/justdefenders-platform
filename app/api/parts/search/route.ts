// Timestamp: 14 March 2026
// JustDefenders Global Parts Search Engine
// Supplier Region + Distance + Delivery Estimation + VIN Compatibility

import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/*
Haversine distance formula
Calculates distance between two coordinates in km
*/
function getDistanceKm(
 lat1: number,
 lon1: number,
 lat2: number,
 lon2: number
) {

 const R = 6371
 const dLat = (lat2-lat1) * Math.PI / 180
 const dLon = (lon2-lon1) * Math.PI / 180

 const a =
   Math.sin(dLat/2) * Math.sin(dLat/2) +
   Math.cos(lat1 * Math.PI/180) *
   Math.cos(lat2 * Math.PI/180) *
   Math.sin(dLon/2) *
   Math.sin(dLon/2)

 const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

 return R * c
}


/*
Delivery Time Estimator
*/
function estimateDelivery(region:string, distance:number){

 if(region === "domestic"){

   if(distance < 500) return "1-2 days"
   if(distance < 2000) return "2-3 days"

   return "3-4 days"

 }

 if(region === "global"){

   if(distance < 5000) return "5-7 days"
   if(distance < 10000) return "7-10 days"

   return "10-14 days"
 }

 return "unknown"
}



export async function GET(req:NextRequest){

 try{

   const { searchParams } = new URL(req.url)

   const query = searchParams.get("q")
   const vin = searchParams.get("vin")

   const supplierScope = searchParams.get("scope") || "all"

   const userLat = Number(searchParams.get("lat"))
   const userLon = Number(searchParams.get("lon"))

   /*
   STEP 1
   Load parts
   */

   let partsQuery = supabase
     .from("parts_catalog")
     .select("*")

   if(query){

     partsQuery = partsQuery.ilike("name", `%${query}%`)

   }

   const { data:parts, error:partsError } = await partsQuery

   if(partsError){

     return NextResponse.json({error:partsError.message})

   }


   /*
   STEP 2
   VIN compatibility filter
   */

   let compatiblePartIds:string[] | null = null

   if(vin){

     const { data:compat } = await supabase
       .from("vin_compatibility")
       .select("part_id")
       .eq("vin", vin)

     compatiblePartIds = compat?.map(c=>c.part_id) || []

   }

   const filteredParts = compatiblePartIds
     ? parts.filter(p=>compatiblePartIds!.includes(p.id))
     : parts


   /*
   STEP 3
   Load supplier pricing
   */

   const { data:suppliers } = await supabase
     .from("supplier_prices")
     .select(`
       price,
       part_id,
       supplier:suppliers(
         id,
         name,
         country,
         latitude,
         longitude
       )
     `)


   /*
   STEP 4
   Combine data
   */

   const results = []

   for(const part of filteredParts){

     const supplierMatches = suppliers?.filter(
       s => s.part_id === part.id
     )

     for(const match of supplierMatches || []){

       const supplier = match.supplier

       let region = supplier.country === "Australia"
         ? "domestic"
         : "global"

       if(
         supplierScope === "domestic" &&
         region !== "domestic"
       ) continue

       if(
         supplierScope === "global" &&
         region !== "global"
       ) continue


       let distance = null

       if(
         userLat &&
         userLon &&
         supplier.latitude &&
         supplier.longitude
       ){

         distance = getDistanceKm(
           userLat,
           userLon,
           supplier.latitude,
           supplier.longitude
         )

       }

       const delivery = estimateDelivery(
         region,
         distance || 0
       )


       results.push({

         part_id:part.id,
         part_name:part.name,
         part_number:part.part_number,

         supplier_id:supplier.id,
         supplier_name:supplier.name,

         price:match.price,

         region,
         distance_km:distance
           ? Math.round(distance)
           : null,

         estimated_delivery:delivery

       })

     }

   }


   /*
   STEP 5
   Sort by price
   */

   results.sort((a,b)=>a.price - b.price)


   return NextResponse.json({

     results

   })


 }catch(err:any){

   return NextResponse.json({

     error:err.message

   })

 }

}