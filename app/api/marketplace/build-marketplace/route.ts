// Timestamp 6 March 2026 18:20
// File: /app/api/marketplace/build-marketplace/route.ts

/*
Defender Parts Intelligence Engine

Combines reliability scores,
supplier reliability and inventory
to generate marketplace listings.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST() {

  const { data: parts } = await supabase
    .from("component_failure_stats")
    .select("*")

  const { data: suppliers } = await supabase
    .from("supplier_parts")
    .select("*")

  const listings = []

  if (parts && suppliers) {

    for (const p of parts) {

      const relatedSuppliers =
        suppliers.filter(s => s.part_number === p.part_number)

      for (const s of relatedSuppliers) {

        listings.push({

          part_number: p.part_number,
          supplier_id: s.supplier_id,
          supplier_name: "Supplier",
          price: s.price,
          stock_quantity: s.stock_quantity,
          reliability_score: 100 - ((p.failure_rate ?? 0) * 100),
          demand_score: p.failure_count

        })

      }

    }

  }

  if (listings.length > 0) {

    await supabase
      .from("parts_marketplace")
      .insert(listings)

  }

  return NextResponse.json({

    listings_generated: listings.length

  })

}