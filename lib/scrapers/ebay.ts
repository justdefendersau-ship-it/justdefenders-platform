# ==================================================================================================
# File: C:\dev\justdefenders\lib\scrapers\ebay.ts
# Timestamp: 13 April 2026 14:10
# Purpose: eBay used parts scraper (AU-focused)
# JustDefenders ©
# ==================================================================================================

New-Item -ItemType Directory -Force -Path "C:\dev\justdefenders\lib\scrapers" | Out-Null

@'
import { chromium } from "playwright";

export async function scrapeEbay(partNumber: string) {

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    const searchUrl = `https://www.ebay.com.au/sch/i.html?_nkw=${partNumber}`;

    console.log("🔍 eBay search:", searchUrl);

    await page.goto(searchUrl, { waitUntil: "networkidle" });
    await page.waitForTimeout(3000);

    const items = await page.$$eval(".s-item", nodes => {
      return nodes.slice(0, 5).map(node => {
        const title = node.querySelector(".s-item__title")?.textContent || "";
        const price = node.querySelector(".s-item__price")?.textContent || "";
        const link = (node.querySelector("a") as HTMLAnchorElement)?.href;

        return { title, price, link };
      });
    });

    const results = items.map(item => {
      const value = parseFloat(item.price.replace(/[^0-9.]/g, ""));

      return {
        supplier: "eBay",
        type: "used",
        region: "AU",
        title: item.title,
        totalAUD: value,
        url: item.link
      };
    });

    return results;

  } catch (e) {
    console.error("❌ eBay error:", e);
    return [];
  } finally {
    await browser.close();
  }
}
'@ | Set-Content -Path "C:\dev\justdefenders\lib\scrapers\ebay.ts" -Encoding UTF8

Write-Host "✅ eBay scraper created"