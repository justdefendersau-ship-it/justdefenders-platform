// ==================================================================================================
// File: C:\dev\justdefenders\lib\scrapers\jlrClassic.ts
// Timestamp: 12 April 2026 21:45
// Purpose: JLR scraper with clean price extraction (final stable version)
// JustDefenders ©
// ==================================================================================================

import { chromium } from 'playwright';

export async function scrapeJLR(partNumber: string) {

  console.log("🔍 START JLR SCRAPE:", partNumber);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // ------------------------------------------------------------------------------------------
    // TRY DIRECT URL PATTERNS (FAST + RELIABLE)
    // ------------------------------------------------------------------------------------------

    const possibleUrls = [
      `https://parts.jaguarlandroverclassic.com/${partNumber.toLowerCase()}-cartridge-engine-oil-filter.html`,
      `https://parts.jaguarlandroverclassic.com/${partNumber.toLowerCase()}.html`
    ];

    let workingUrl: string | null = null;

    for (const url of possibleUrls) {

      console.log("🌐 Trying:", url);

      const response = await page.goto(url, { waitUntil: 'domcontentloaded' });

      if (response && response.status() === 200) {

        const titleCheck = await page.locator('h1').first().textContent();

        if (titleCheck && !titleCheck.toLowerCase().includes('not found')) {
          workingUrl = url;
          console.log("✅ Found valid product page:", url);
          break;
        }
      }
    }

    if (!workingUrl) {
      console.log("❌ No valid product page found");
      return null;
    }

    // ------------------------------------------------------------------------------------------
    // EXTRACT DATA
    // ------------------------------------------------------------------------------------------

    await page.waitForTimeout(2000);

    // TITLE
    let title = '';
    try {
      title = await page.locator('h1').first().textContent() || '';
    } catch {}

    // PRICE (CLEAN FIX APPLIED)
    let price = '';
    try {
      const priceEl = page.locator('[class*="price"]');

      if (await priceEl.count()) {
        const priceText = await priceEl.first().textContent() || '';

        // Extract all £ prices
        const matches = priceText.match(/£\d+\.\d+/g);

        if (matches && matches.length > 0) {
          price = matches[matches.length - 1]; // take final (discounted price)
        }
      }

      console.log("💰 CLEAN PRICE:", price);

    } catch {
      console.log("⚠ Price not found");
    }

    // IMAGE
    let image = '';
    try {
      const img = page.locator('.product-image-photo').first();
      if (await img.count()) {
        image = await img.getAttribute('src') || '';
      }
    } catch {}

    const result = {
      partNumber,
      title: title.trim(),
      price,
      image,
      url: workingUrl
    };

    console.log("✅ JLR RESULT:", result);

    return result;

  } catch (err) {
    console.error("❌ SCRAPER ERROR:", err);
    return null;
  } finally {
    await browser.close();
  }
}