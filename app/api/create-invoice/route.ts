/*
============================================================
JustDefenders
Create Invoice + Auto PDF
Date: 22 Feb 2026
============================================================
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import PDFDocument from "pdfkit"
import { Buffer } from "buffer"

export async function POST(req: Request) {

  const body = await req.json()
  const { jobCardId } = body

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // ==============================
  // Get Job
  // ==============================

  const { data: job } =
    await supabase
      .from("job_cards")
      .select("*")
      .eq("id", jobCardId)
      .single()

  if (!job)
    return NextResponse.json({ error: "Job not found" }, { status: 400 })

  // ==============================
  // Get Parts
  // ==============================

  const { data: parts } =
    await supabase
      .from("job_parts")
      .select("*")
      .eq("job_card_id", jobCardId)

  const labourTotal =
    job.labour_hours * job.labour_rate

  const partsTotal =
    (parts || []).reduce(
      (sum, p) => sum + (p.sale_price * p.quantity),
      0
    )

  const subtotal = labourTotal + partsTotal
  const gst = subtotal * 0.10
  const total = subtotal + gst

  // ==============================
  // Get Organization
  // ==============================

  const organization_id = job.organization_id

  const { data: nextNumber } =
    await supabase.rpc(
      "get_next_invoice_number",
      { org: organization_id }
    )

  // ==============================
  // Generate PDF
  // ==============================

  const doc = new PDFDocument()
  const chunks: Buffer[] = []

  doc.on("data", chunk => chunks.push(chunk))

  doc.fontSize(20)
     .fillColor("#333333")
     .text("JustDefenders Workshop Invoice", { bold: true })

  doc.moveDown()
  doc.fontSize(12)
  doc.text(`Invoice #: INV-${nextNumber}`)
  doc.text(`Date: ${new Date().toLocaleDateString("en-AU")}`)
  doc.moveDown()

  doc.text("Labour:")
  doc.text(
    `${job.labour_hours} hrs @ $${job.labour_rate.toFixed(2)}`
  )
  doc.text(`$${labourTotal.toFixed(2)}`)

  doc.moveDown()
  doc.text("Parts:")

  parts?.forEach(p => {
    doc.text(
      `${p.name} x${p.quantity} - $${(p.sale_price * p.quantity).toFixed(2)}`
    )
  })

  doc.moveDown()
  doc.text(`Subtotal: $${subtotal.toFixed(2)}`)
  doc.text(`GST: $${gst.toFixed(2)}`)
  doc.text(`Total: $${total.toFixed(2)}`)

  doc.end()

  const pdfBuffer =
    await new Promise<Buffer>((resolve) => {
      doc.on("end", () => {
        resolve(Buffer.concat(chunks))
      })
    })

  // ==============================
  // Upload to Storage
  // ==============================

  const filePath =
    `${organization_id}/INV-${nextNumber}.pdf`

  await supabase.storage
    .from("workshop-invoices")
    .upload(filePath, pdfBuffer, {
      contentType: "application/pdf",
      upsert: true
    })

  // ==============================
  // Save Invoice Record
  // ==============================

  const { data: invoice } =
    await supabase
      .from("invoices")
      .insert({
        organization_id,
        job_card_id: jobCardId,
        invoice_number: nextNumber,
        subtotal,
        gst,
        total,
        pdf_path: filePath
      })
      .select()
      .single()

  return NextResponse.json({ invoice })
}