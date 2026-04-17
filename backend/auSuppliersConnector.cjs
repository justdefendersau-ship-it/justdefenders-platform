//
// File: backend/auSuppliersConnector.cjs
// JustDefenders ©
// Phase 6I — Site-Specific Selectors (Production Mode)
//

const { chromium } = require("playwright");

function parsePrice(text) {
    if (!text) return null;
    const match = text.replace(/,/g, '').match(/\$([0-9]+(\.[0-9]{2})?)/);
    return match ? Number(match[1]) : null;
}

// ----------------------------------------------------------------------------------------------
// ROVACRAFT (Shopify-style)
// ----------------------------------------------------------------------------------------------

async function fetchRovacraft(page, partNumber) {

    try {
        await page.goto("https://www.rovacraft.com.au/search?q=" + partNumber, { timeout: 20000 });

        await page.waitForSelector('a[href*="/products/"]', { timeout: 5000 });

        const product = await page.locator('a[href*="/products/"]').first();
        const url = await product.getAttribute("href");

        if (!url) return [];

        console.log("→ Rovacraft:", url);

        await page.goto(url, { timeout: 15000 });

        const priceText = await page.locator('[class*="price"]').first().innerText();
        const price = parsePrice(priceText);

        if (!price) return [];

        return [{
            partNumber,
            supplier: "Rovacraft",
            region: "AU",
            price_aud: price,
            delivery_days: 2,
            availability: "in_stock",
            source: "ROVACRAFT"
        }];

    } catch {
        console.log("❌ Rovacraft failed");
        return [];
    }
}

// ----------------------------------------------------------------------------------------------
// ALL FOUR X 4 (WooCommerce style)
// ----------------------------------------------------------------------------------------------

async function fetchAll4x4(page, partNumber) {

    try {
        await page.goto("https://www.allfourx4.com.au/search?q=" + partNumber, { timeout: 20000 });

        await page.waitForSelector('a[href*="/product/"]', { timeout: 5000 });

        const product = await page.locator('a[href*="/product/"]').first();
        const url = await product.getAttribute("href");

        if (!url) return [];

        console.log("→ All4x4:", url);

        await page.goto(url, { timeout: 15000 });

        const priceText = await page.locator('.price').first().innerText();
        const price = parsePrice(priceText);

        if (!price) return [];

        return [{
            partNumber,
            supplier: "All Four x 4 Spares",
            region: "AU",
            price_aud: price,
            delivery_days: 2,
            availability: "in_stock",
            source: "ALL4X4"
        }];

    } catch {
        console.log("❌ All4x4 failed");
        return [];
    }
}

// ----------------------------------------------------------------------------------------------
// KARCRAFT (fallback generic)
// ----------------------------------------------------------------------------------------------

async function fetchKarcraft(page, partNumber) {

    try {
        await page.goto("https://www.karcraft.com.au/search?q=" + partNumber, { timeout: 20000 });

        const text = await page.locator("body").innerText();
        const price = parsePrice(text);

        if (!price) return [];

        return [{
            partNumber,
            supplier: "Karcraft",
            region: "AU",
            price_aud: price,
            delivery_days: 2,
            availability: "in_stock",
            source: "KARCRAFT"
        }];

    } catch {
        console.log("❌ Karcraft failed");
        return [];
    }
}

// ----------------------------------------------------------------------------------------------
// MAIN
// ----------------------------------------------------------------------------------------------

async function getAUSuppliers(partNumber) {

    console.log("=== AU SITE-SPECIFIC MODE ===");

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const results = [];

    results.push(...await fetchRovacraft(page, partNumber));
    results.push(...await fetchAll4x4(page, partNumber));
    results.push(...await fetchKarcraft(page, partNumber));

    await browser.close();

    console.log("AU suppliers found:", results.length);

    return results;
}

module.exports = { getAUSuppliers };