/*
Timestamp: 8 March 2026 — 03:52
File: /app/api/suppliers/route.ts

Purpose:
Supplier management API.

Supports:
GET suppliers
POST create supplier
DELETE remove supplier
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

 const { data } = await supabase
  .from("suppliers")
  .select("*")
  .order("supplier_name")

 return NextResponse.json(data || [])

}

export async function POST(req:Request){

 const body = await req.json()

 const { supplier_name, brand } = body

 const { data } = await supabase
  .from("suppliers")
  .insert({
   supplier_name,
   brand
  })

 return NextResponse.json(data)

}

export async function DELETE(req:Request){

 const { searchParams } = new URL(req.url)

 const id = searchParams.get("id")

 await supabase
  .from("suppliers")
  .delete()
  .eq("id",id)

 return NextResponse.json({ success:true })

}