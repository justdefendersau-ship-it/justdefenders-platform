// Timestamp 7 March 2026
// File: /app/api/reports/generate/route.ts

/*
Automated Reliability Report Generator

Creates fleet reliability PDF reports.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import PDFDocument from "pdfkit"
import fs from "fs"
import path from "path"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {

  const body = await req.json()

  const organizationId = body.organization_id
  const reportType = body.report_type || "fleet"

  try {

    const { data: fleet } = await supabase
      .from("materialized_fleet_health")
      .select("*")
      .eq("organization_id", organizationId)
      .single()

    const { data: anomalies } = await supabase
      .from("reliability_anomalies")
      .select("*")
      .limit(10)

    const { data: demand } = await supabase
      .from("market_demand_forecasts")
      .select("*")
      .limit(10)

    const reportData = {

      fleet,
      anomalies,
      demand

    }

    const fileName =
      `report_${Date.now()}.pdf`

    const filePath =
      path.join(process.cwd(), "public", fileName)

    const doc = new PDFDocument()

    doc.pipe(fs.createWriteStream(filePath))

    doc.fontSize(22)
      .text("Defender Reliability Intelligence Report")

    doc.moveDown()

    doc.fontSize(14)
      .text(`Organization: ${organizationId}`)

    doc.moveDown()

    if (fleet) {

      doc.text(`Fleet Size: ${fleet.fleet_size}`)
      doc.text(`Fleet Risk Score: ${fleet.fleet_risk_score}`)

    }

    doc.moveDown()

    doc.text("Top Reliability Anomalies")

    anomalies?.forEach((a: any) => {

      doc.text(`- ${a.description}`)

    })

    doc.moveDown()

    doc.text("High Demand Components")

    demand?.forEach((d: any) => {

      doc.text(
        `${d.part_number} — Demand Score ${d.demand_score}`
      )

    })

    doc.end()

    await supabase
      .from("reliability_reports")
      .insert({

        organization_id: organizationId,

        report_type: reportType,

        report_data: reportData,

        pdf_url: `/${fileName}`

      })

    return NextResponse.json({

      message: "Report generated",
      pdf_url: `/${fileName}`

    })

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )

  }

}