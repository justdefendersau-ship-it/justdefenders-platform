/*
============================================================
JustDefenders
Ownership Intelligence Report (Full TCO)
Date: 23 Feb 2026
============================================================
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import PDFDocument from "pdfkit"
import { Buffer } from "buffer"

export async function POST(req: Request) {

  const body = await req.json()
  const { vehicleId } = body

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Load vehicle
  const { data: vehicle } =
    await supabase
      .from("vehicles")
      .select("*")
      .eq("id", vehicleId)
      .single()

  if (!vehicle)
    return NextResponse.json(
      { error: "Vehicle not found" },
      { status: 400 }
    )

  // Fuel
  const { data: fuel } =
    await supabase
      .from("fuel_logs")
      .select("*")
      .eq("vehicle_id", vehicleId)

  const totalFuel =
    (fuel || []).reduce(
      (sum, f) => sum + Number(f.total_cost),
      0
    )

  // Maintenance
  const { data: maintenance } =
    await supabase
      .from("maintenance_records")
      .select("*")
      .eq("vehicle_id", vehicleId)

  const totalMaintenance =
    (maintenance || []).reduce(
      (sum, m) => sum + Number(m.cost),
      0
    )

  // Insurance / Roadside / Registration
  const { data: ownershipCosts } =
    await supabase
      .from("ownership_costs")
      .select("*")
      .eq("vehicle_id", vehicleId)

  const recurringTotal =
    (ownershipCosts || []).reduce((sum, c) => {

      if (c.frequency === "annual")
        return sum + Number(c.amount)

      if (c.frequency === "monthly")
        return sum + Number(c.amount) * 12

      return sum

    }, 0)

  const lifetimeCost =
    totalFuel +
    totalMaintenance +
    recurringTotal

  const purchasePrice =
    Number(vehicle.purchase_price || 0)

  const totalInvested =
    purchasePrice + lifetimeCost

  // ==========================
  // PDF
  // ==========================

  const doc = new PDFDocument()
  const chunks: Buffer[] = []
  doc.on("data", c => chunks.push(c))

  doc.fontSize(22)
     .text("JustDefenders Ownership Report")

  doc.moveDown()
  doc.fontSize(14)
  doc.text(`${vehicle.year} ${vehicle.make} ${vehicle.model}`)
  doc.moveDown()

  doc.text(`Purchase Price: $${purchasePrice}`)
  doc.text(`Fuel Spend: $${totalFuel}`)
  doc.text(`Maintenance Spend: $${totalMaintenance}`)
  doc.text(`Insurance & Other: $${recurringTotal}`)
  doc.moveDown()

  doc.fontSize(16)
     .text(`Total Invested: $${totalInvested}`)

  doc.end()

  const pdfBuffer =
    await new Promise<Buffer>(resolve =>
      doc.on("end", () =>
        resolve(Buffer.concat(chunks))
      )
    )

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf"
    }
  })
}