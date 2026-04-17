/*
Timestamp: 6 March 2026 00:22
Supplier Risk Intelligence API

Links failure records to suppliers via jlr_part_registry.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

  try{

    const { data, error } = await supabase
      .from("fleet_part_failures")
      .select(`
        part_name,
        jlr_part_registry (
          supplier_name
        )
      `)

    if(error){

      console.error("Supplier risk query error:",error)

      return NextResponse.json([])

    }

    const supplierFailures:Record<string,number> = {}

    data?.forEach((row:any)=>{

      const supplier =
        row.jlr_part_registry?.supplier_name || "Unknown"

      supplierFailures[supplier] =
        (supplierFailures[supplier] || 0) + 1

    })

    const results = Object.entries(supplierFailures).map(

      ([supplier,failures]) => ({

        supplier,
        failures

      })

    )

    return NextResponse.json(results)

  }
  catch(err){

    console.error("Supplier risk engine error:",err)

    return NextResponse.json([])

  }

}