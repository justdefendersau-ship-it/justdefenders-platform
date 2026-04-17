// Timestamp: 13 March 2026 14:40
// Local Land Rover Defender VIN Decoder

export interface DecodedVIN {
  make: string
  model: string
  engine?: string
  gearbox?: string
  year?: number
}

const yearCodes: Record<string, number> = {
  A: 1980,
  B: 1981,
  C: 1982,
  D: 1983,
  E: 1984,
  F: 1985,
  G: 1986,
  H: 1987,
  J: 1988,
  K: 1989,
  L: 1990,
  M: 1991,
  N: 1992,
  P: 1993,
  R: 1994,
  S: 1995,
  T: 1996,
  V: 1997,
  W: 1998,
  X: 1999,
  Y: 2000,
  1: 2001,
  2: 2002,
  3: 2003,
  4: 2004,
  5: 2005,
  6: 2006,
  7: 2007,
  8: 2008,
  9: 2009
}

const engineCodes: Record<string, string> = {
  A: "2.5 NA Diesel",
  B: "2.5 Petrol",
  C: "3.5 V8",
  D: "200Tdi",
  H: "300Tdi",
  J: "Td5",
  P: "2.4 Puma TDCi",
  F: "2.2 Puma TDCi"
}

const gearboxCodes: Record<string, string> = {
  A: "LT77",
  B: "R380",
  C: "Automatic",
  D: "MT82"
}

export function decodeDefenderVIN(vin: string): DecodedVIN | null {

  if (!vin || vin.length !== 17) {
    return null
  }

  const manufacturer = vin.substring(0, 3)

  if (manufacturer !== "SAL") {
    return null
  }

  const modelCode = vin.substring(3, 5)

  let model = "Unknown"

  if (modelCode === "LD" || modelCode === "LH") {
    model = "Defender"
  }

  const engineCode = vin[6]
  const gearboxCode = vin[7]
  const yearCode = vin[9]

  const engine = engineCodes[engineCode]
  const gearbox = gearboxCodes[gearboxCode]
  const year = yearCodes[yearCode]

  return {
    make: "Land Rover",
    model,
    engine,
    gearbox,
    year
  }
}