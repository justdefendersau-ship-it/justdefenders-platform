/**
 * ============================================================
 * JustDefenders © VIN Engine (Enhanced)
 * ============================================================
 */

export function decodeVIN(vin) {

  if (!vin || vin.length < 5) return null;

  const isDefender = vin.toUpperCase().includes("DEF");

  return {
    vin,
    manufacturer: "Land Rover",
    model: isDefender ? "Defender" : "Unknown",
    engine: "2.2 TDCi",
    region: "AU",
    compatibleEngines: ["2.2 TDCi", "2.4 TDCi"]
  };
}
