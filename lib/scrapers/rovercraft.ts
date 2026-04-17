# ==================================================================================================
# File: C:\dev\justdefenders\lib\scrapers\rovacraft.ts
# Timestamp: 13 April 2026 13:40
# Purpose: Rovacraft scraper with REAL price extraction
# JustDefenders ©
# ==================================================================================================

@'
import { chromium } from "playwright";

export async function scrapeRovacraft(partNumber: string) {

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    const searchUrl = `https://www.rovacraft.com.au/search?q=${partNumber}`;

    await page.goto(searchUrl, { waitUntil: "networkidle" });
    await page.waitForTimeout(3000);

    const links = await page.$$eval("a", els =>
      els.map(e => (e as HTMLAnchorElement).href)
    );

    const productLink = links.find(l =>
      l.toLowerCase().includes(partNumber.toLowerCase())
    );

    if (!productLink) return null;

    await page.goto(productLink, { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);

    let price = "";
    const priceEl = page.locator('[class*="price"]');

    if (await priceEl.count()) {
      price = (await priceEl.first().textContent()) || "";
    }

    const numeric = parseFloat(price.replace(/[^0-9.]/g, ""));

    return {
      supplier: "Rovacraft",
      url: productLink,
      priceAUD: numeric,
      totalAUD: numeric
    };

  } catch (e) {
    return null;
  } finally {
    await browser.close();
  }
}
'@ | Set-Content -Path "C:\dev\justdefenders\lib\scrapers\rovacraft.ts" -Encoding UTF8