//
// File: backend/sparesboxConnector.cjs
// Timestamp: 09 April 2026 06:20
// JustDefenders ©
// Phase 4H — Timeout-safe Playwright version
//

const { chromium } = require('playwright');

async function fetchSparesbox(partNumber) {

    console.log("=== SPARESBOX SEARCH MODE ===");

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const url = "https://www.sparesbox.com.au/search?q=" + partNumber;

    // 🔥 FIX: use domcontentloaded instead of networkidle
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });

    let price = null;

    try {
        // wait for page to render SOME content
        await page.waitForTimeout(2000);

        // try product links (looser selector)
        const links = await page.locator('a').all();

        let productUrl = null;

        for (const link of links) {
            const href = await link.getAttribute('href');
            if (href && href.includes('/product/')) {
                productUrl = href;
                break;
            }
        }

        if (!productUrl) {
            console.log("No product link found");
        } else {

            console.log("Product URL:", productUrl);

            await page.goto(productUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });

            const content = await page.content();

            const match = content.match(/([0-9]+\.[0-9]{2})/);

            if (match) {
                price = Number(match[1]);
            }
        }

    } catch (err) {
        console.log("Sparesbox extraction failed");
    }

    await browser.close();

    console.log("Sparesbox Price:", price);

    return [{
        partNumber: partNumber,
        supplier: "Sparesbox",
        price: price,
        availability: price ? "in_stock" : "unknown"
    }];
}

module.exports = { fetchSparesbox };