// route.ts
// Timestamp: 10 March 2026 17:20
// Commentary:
// Handles GPX and photo uploads for trips.

import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req:Request){

 const formData = await req.formData()

 const file = formData.get("file") as File
 const trip_id = formData.get("trip_id") as string

 const fileName = `${Date.now()}-${file.name}`

 const { data,error } = await supabase.storage
  .from("trip-files")
  .upload(fileName,file)

 if(error){
  return NextResponse.json({ error })
 }

 const publicUrl =
  supabase.storage
   .from("trip-files")
   .getPublicUrl(fileName).data.publicUrl


 if(file.name.endsWith(".gpx")){

  await supabase
   .from("trip_tracks")
   .insert({

    trip_id,
    gpx_file_url:publicUrl

   })

 }

 else{

  await supabase
   .from("trip_photos")
   .insert({

    trip_id,
    image_url:publicUrl

   })

 }

 return NextResponse.json({ success:true })

}