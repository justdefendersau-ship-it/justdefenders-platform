import { NextResponse } from "next/server"
import { PDFDocument, StandardFonts } from "pdf-lib"
import { requireAuth } from "@/lib/secureApi"

export async function POST(req: Request) {

  try {

    const { user } = await requireAuth()

    const body = await req.json()

    if (!body.vehicle) {
      return new NextResponse("Invalid request", { status: 400 })
    }

    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([600, 800])
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

    page.drawText("JustDefenders Risk Intelligence Report", {
      x: 50,
      y: 750,
      size: 18,
      font
    })

    page.drawText(`Generated for: ${user.email}`, {
      x: 50,
      y: 730,
      size: 10,
      font
    })

    page.drawText(`Health Score: ${body.healthScore}`, {
      x: 50,
      y: 700,
      size: 12,
      font
    })

    page.drawText(`Total Expected Loss: $${body.totalExpectedLoss}`, {
      x: 50,
      y: 680,
      size: 12,
      font
    })

    const pdfBytes = await pdfDoc.save()

    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf"
      }
    })

  } catch {
    return new NextResponse("Unauthorized", { status: 401 })
  }
}