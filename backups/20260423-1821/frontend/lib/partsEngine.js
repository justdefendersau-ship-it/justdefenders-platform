/**
 * ============================================================
 * JustDefenders © Parts Engine (Ordering Enabled)
 * File: C:\dev\justdefenders\frontend\lib\partsEngine.js
 * Timestamp: 03 April 2026 02:25 (Sydney)
 * ============================================================
 */

export function getPartIntelligence(partKey) {

  const DB = {
    turbocharger: {
      oem: "LR123456",
      options: [
        {
          brand: "Garrett",
          type: "OEM",
          price_min: 1100,
          price_max: 1300,
          supplier: "LR Direct",
          link: "https://www.lrdirect.com/turbocharger",
          availability: "in_stock"
        },
        {
          brand: "Britpart",
          type: "Aftermarket",
          price_min: 700,
          price_max: 900,
          supplier: "Britcar",
          link: "https://www.britcar.com/turbocharger",
          availability: "in_stock"
        },
        {
          brand: "Hybrid Performance",
          type: "Performance",
          price_min: 1400,
          price_max: 1800,
          supplier: "TurboUpgrades",
          link: "https://www.turboupgrades.com",
          availability: "limited"
        }
      ]
    }
  };

  const part = DB[partKey];

  if (!part) return null;

  const cheapest = part.options.reduce((a, b) =>
    a.price_min < b.price_min ? a : b
  );

  const best_value = part.options[0]; // simple baseline
  const performance = part.options.find(p => p.type === "Performance");

  return {
    part: partKey,
    oem: part.oem,
    decision: {
      cheapest,
      best_value,
      performance
    }
  };
}
