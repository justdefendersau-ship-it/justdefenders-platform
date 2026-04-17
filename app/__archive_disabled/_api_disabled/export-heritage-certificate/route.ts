/*
============================================================
JustDefenders
Defender Heritage Certificate
Date: 23 Feb 2026
============================================================
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import PDFDocument from "pdfkit"
import { Buffer } from "buffer"

export async function POST(req: Request) {

  const { vehicleId } = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

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

  const { data: model } =
    await supabase
      .from("defender_models")
      .select("*")
      .eq("model_code", vehicle.model_code)
      .eq("generation", vehicle.generation)
      .single()

  const collectability =
    model?.base_collectability_score || 70

  // ==========================
  // Generate Certificate PDF
  // ==========================

  const doc = new PDFDocument({
    size: "A4",
    layout: "portrait",
    margin: 50
  })

  const chunks: Buffer[] = []
  doc.on("data", c => chunks.push(c))

  doc.fontSize(28)
     .fillColor("#333333")
     .text("JustDefenders", { align: "center" })

  doc.moveDown()
  doc.fontSize(22)
     .text("Heritage Certificate", { align: "center" })

  doc.moveDown(2)

  doc.fontSize(16)
     .text(`${vehicle.year} ${vehicle.make} ${vehicle.model}`, { align: "center" })

  doc.moveDown(2)

  doc.fontSize(14)
     .text(`Generation: ${vehicle.generation}`, { align: "center" })

  doc.text(`Engine: ${model?.engine || "N/A"}`, { align: "center" })

  doc.moveDown()

  doc.fontSize(18)
     .text(`Collectability Score: ${collectability}/100`, { align: "center" })

  doc.moveDown(3)

  doc.fontSize(12)
     .text("This certificate recognises the heritage value of this Land Rover Defender.", {
       align: "center"
     })

  doc.end()

  const pdfBuffer =
    await new Promise<Buffer>(resolve =>
      doc.on("end", () =>
        resolve(Buffer.concat(chunks))
      )
    )

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        `attachment; filename="Defender_Heritage_${vehicle.year}.pdf"`
    }
  })
}