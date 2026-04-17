 // ------------------------------------------------------
// File: app/lib/supplierLinks.ts
// Timestamp: 18 March 2026 12:50
// JustDefenders ©
//
// Supplier Link Generator (Affiliate Ready)
// ------------------------------------------------------

type Part = {
  name: string
  supplier?: string
  part_number?: string
}

// Placeholder affiliate base URLs
const SUPPLIER_BASE_URLS: Record<string, string> = {
  "Britpart": "https://www.britpart.com/search?q=",
  "Allmakes": "https://allmakes4x4.com/search?q=",
  "eBay": "https://www.ebay.com/sch/i.html?_nkw=",
  "Generic": "https://www.google.com/search?q="
}

export function buildSupplierLink(part: Part): string {

  const supplier = part.supplier || "Generic"

  const base = SUPPLIER_BASE_URLS[supplier] || SUPPLIER_BASE_URLS["Generic"]

  const query = encodeURIComponent(
    part.part_number || part.name
  )

  return `${base}${query}`

}