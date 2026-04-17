// =====================================================
// JustDefenders ©
// File: /lib/utils/fuelBrand.ts
// Timestamp: 22 March 2026 14:25 (Sydney)
// Purpose: Detect fuel station brand from geocode data
// =====================================================

export function detectFuelBrand(text: string = "") {
  const t = text.toLowerCase();

  if (t.includes("bp")) return "BP";
  if (t.includes("shell")) return "Shell";
  if (t.includes("ampol")) return "Ampol";
  if (t.includes("caltex")) return "Caltex";
  if (t.includes("7-eleven") || t.includes("7 eleven")) return "7-Eleven";
  if (t.includes("mobil")) return "Mobil";
  if (t.includes("metro")) return "Metro";

  return "Independent";
}