//
// File: backend/britishOffroadConnector.cjs
// Timestamp: 09 April 2026 06:20
// JustDefenders ©
// Phase 5A — British Off Road Playwright Connector
//

const { chromium } = require('playwright');

async function fetchBritishOffroad(partNumber) {

    console.log("=== BRITISH OFF ROAD SEARCH ===");

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const url = "https://www.britishoffroad.com.au/search?q=" + partNumber;

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });

    let price = null;

    try {
        await page.waitForTimeout(2000);

        // find product links
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
            console.log("No product found");
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
        console.log("British Off Road extraction failed");
    }

    await browser.close();

    console.log("British Off Road Price:", price);

    return [{
        partNumber: partNumber,
        supplier: "British Off Road",
        price: price,
        availability: price ? "in_stock" : "unknown"
    }];
}

module.exports = { fetchBritishOffroad };