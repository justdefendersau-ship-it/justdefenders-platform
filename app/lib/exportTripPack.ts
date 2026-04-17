// ------------------------------------------------------
// File: app/lib/exportTripPack.ts
// Timestamp: 18 March 2026 13:30
// JustDefenders ©
//
// Trip Pack PDF Export Utility
// ------------------------------------------------------

import jsPDF from "jspdf"

type Part = {
  name: string
  price: number
  supplier?: string
}

export function exportTripPackPDF(parts: Part[], vin: string) {

  const doc = new jsPDF()

  // Title
  doc.setFontSize(18)
  doc.text("JustDefenders Trip Pack", 20, 20)

  doc.setFontSize(10)
  doc.text(`Vehicle VIN: ${vin}`, 20, 30)

  let y = 50

  parts.forEach((part, index) => {

    doc.setFontSize(12)
    doc.text(`${index + 1}. ${part.name}`, 20, y)

    doc.setFontSize(10)
    doc.text(
      `Supplier: ${part.supplier || "N/A"} | Price: $${part.price}`,
      20,
      y + 6
    )

    y += 15

    if (y > 270) {
      doc.addPage()
      y = 20
    }

  })

  const total = parts.reduce((sum, p) => sum + (p.price || 0), 0)

  doc.setFontSize(14)
  doc.text(`Total Estimated Cost: $${total}`, 20, y + 10)

  doc.save(`trip-pack-${vin}.pdf`)

}