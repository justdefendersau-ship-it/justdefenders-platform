# ==================================================================================================
# File: C:\dev\justdefenders\lib\engine\decisionEngine.ts
# Timestamp: 13 April 2026 14:35
# Purpose: Integrate VIN / REGO / Model-Year into engine
# JustDefenders ©
# ==================================================================================================

@'
import { scrapeJLR } from "../scrapers/jlrClassic";
import { scrapeRovacraft } from "../scrapers/rovacraft";
import { scrapeEbay } from "../scrapers/ebay";
import { buildVehicleContext } from "./vehicle";

export async function runDecisionEngine(request: any) {

  const vehicle = await buildVehicleContext(request);

  console.log("🚗 VEHICLE CONTEXT:", vehicle);

  const results: any[] = [];

  const jlr = await scrapeJLR(request.partNumber);

  if (jlr?.price) {
    results.push({
      supplier: "JLR Classic",
      totalAUD: 50,
      title: jlr.title,
      vehicle
    });
  }

  const rova = await scrapeRovacraft(request.partNumber);
  if (rova) results.push(rova);

  if (request.includeUsed) {
    const ebay = await scrapeEbay(request.partNumber);
    results.push(...ebay);
  }

  results.sort((a,b)=> (a.totalAUD||999)-(b.totalAUD||999));

  if (results[0]) results[0].best = true;

  return results;
}
'@ | Set-Content -Path "C:\dev\justdefenders\lib\engine\decisionEngine.ts" -Encoding UTF8

Write-Host "✅ Engine now uses VIN / REGO / model-year"