/*
Timestamp: 8 March 2026 — 04:11
File: /app/api/suppliers/import/route.ts

Purpose:
Bulk supplier CSV import engine.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function parseCSV(text:string){

 const lines = text.split("\n")

 const headers = lines[0].split(",")

 const rows = []

 for(let i=1;i<lines.length;i++){

  const values = lines[i].split(",")

  const row:any = {}

  headers.forEach((h,index)=>{

   row[h.trim()] = values[index]?.trim()

  })

  if(row.supplier_name){
   rows.push(row)
  }

 }

 return rows

}

export async function POST(req:Request){

 try{

  const body = await req.json()

  const csv = body.csv

  const rows = parseCSV(csv)

  let inserted = 0

  for(const r of rows){

   const { data:existing } = await supabase
    .from("suppliers")
    .select("id")
    .eq("supplier_name",r.supplier_name)
    .single()

   if(!existing){

    await supabase
     .from("suppliers")
     .insert({

      supplier_name:r.supplier_name,
      brand:r.brand || null,
      country:r.country || null,
      website:r.website || null

     })

    inserted++

   }

  }

  return NextResponse.json({

   imported:inserted

  })

 }catch(err){

  console.error("Supplier import error:",err)

  return NextResponse.json({

   imported:0

  })

 }

}