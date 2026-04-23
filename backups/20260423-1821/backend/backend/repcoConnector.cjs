//
// File: backend/repcoConnector.cjs
// JustDefenders ©
// Phase 7AA — Non-blocking Repco connector
//

const { chromium } = require("playwright");

function parsePrice(text) {
    if (!text) return null;
    const match = text.replace(/,/g, "").match(/\$([0-9]+(\.[0-9]{2})?)/);
    return match ? Number(match[1]) : null;
}

async function fetchRepco(partNumber) {

    console.log("=== REPCO SAFE MODE ===");

    let browser;

    try {

        browser = await chromium.launch({
            headless: true,
            
        });

        const page = await browser.newPage();

        // ------------------------------------------------------------------------------------------
        // 🔥 DIRECT SEARCH URL (NO INPUT FIELD DEPENDENCY)
        // ------------------------------------------------------------------------------------------

        const searchUrl = "https://www.repco.com.au/search?q=" + partNumber;

        console.log("🔍 Repco direct search:", searchUrl);

        await page.goto(searchUrl, { timeout: 30000 });

        await page.waitForTimeout(4000);

        // ------------------------------------------------------------------------------------------
        // FIND PRODUCT LINKS
        // ------------------------------------------------------------------------------------------

        const links = await page.locator('a[href*="/p/"]').all();

        const maxLinks = Math.min(links.length, 5);

        for (let i = 0; i < maxLinks; i++) {

            const link = links[i];

            const href = await link.getAttribute("href");

            if (!href) continue;

            const url = href.startsWith("http")
                ? href
                : "https://www.repco.com.au" + href;

            console.log("→ Repco product:", url);

            await page.goto(url, { timeout: 20000 });
            await page.waitForTimeout(3000);

            const bodyText = await page.locator("body").innerText();

            const price = parsePrice(bodyText);

            if (!price) continue;

            await browser.close();

            console.log("✔ Repco Price:", price);

            return [{
                partNumber,
                supplier: "Repco",
                region: "AU",
                price_aud: price,
                delivery_days: 2,
                availability: "in_stock",
                source: "REPCO_SAFE",

                productText: bodyText,
                productTitle: bodyText.substring(0, 200)
            }];
        }

        await browser.close();

        console.log("❌ No valid Repco result");

        return [];

    } catch (err) {

        console.log("❌ Repco failed:", err.message);

        if (browser) await browser.close();

        return [];
    }
}

module.exports = { fetchRepco };
