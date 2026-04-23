//
// File: backend/supercheapConnector.cjs
// JustDefenders Â©
// Phase 8M â€” STRICT Part Matching (FINAL)
//

const { chromium } = require("playwright");

// ----------------------------------------------------------------------------------------------
// PRICE PARSER
// ----------------------------------------------------------------------------------------------

function parsePrice(text) {
    if (!text) return null;
    const match = text.replace(/,/g, "").match(/\$([0-9]+(\.[0-9]{2})?)/);
    return match ? Number(match[1]) : null;
}

// ----------------------------------------------------------------------------------------------
// ðŸ”¥ STRICT MATCH (KEY FIX)
// ----------------------------------------------------------------------------------------------

function isRelevant(text, variant) {

    const t = text.toLowerCase();
    const v = variant.toLowerCase();

    // MUST contain actual part number
    const hasPartNumber = t.includes(v);

    // MUST be oil filter category
    const isFilter = t.includes("oil filter");

    return hasPartNumber && isFilter;
}

// ----------------------------------------------------------------------------------------------

function extractProductUrls(html) {

    const urls = [];
    const regex = /href="(\/p\/[^"]+)"/g;

    let match;

    while ((match = regex.exec(html)) !== null) {
        urls.push("https://www.supercheapauto.com.au" + match[1]);
    }

    return [...new Set(urls)];
}

// ----------------------------------------------------------------------------------------------

async function fetchSupercheap(partNumber, variants = []) {

    console.log("=== SUPERCHEAP STRICT MODE ===");

    let browser;

    try {

        browser = await (async () => {

    // 🔥 TRY FAST MODE FIRST
    try {
        return await chromium.launch({
            headless: true
        });
    } catch {
        console.log("⚠ Fast mode failed, switching to safe mode");
    }

    // 🔥 FALLBACK SAFE MODE
    return await chromium.launch({
        headless: false,
        slowMo: 100
    });

})();

        const page = await browser.newPage();

        const allVariants = variants.length ? variants : [partNumber];

        for (const variant of allVariants) {

            console.log("ðŸ” SC Searching:", variant);

            const searchUrl = "https://www.supercheapauto.com.au/search?q=" + variant;

            await page.goto(searchUrl, { timeout: 30000 });

            await page.waitForTimeout(4000);

            const html = await page.content();

            const productUrls = extractProductUrls(html);

            console.log("ðŸ”Ž Extracted URLs:", productUrls.length);

            for (let i = 0; i < Math.min(productUrls.length, 10); i++) {

                const productUrl = productUrls[i];

                console.log("â†’ Checking:", productUrl);

                try {

                    await page.goto(productUrl, { timeout: 20000 });

                    await page.waitForTimeout(2000);

                    const bodyText = await page.locator("body").innerText();

                    // ðŸ”¥ STRICT FILTER
                    if (!isRelevant(bodyText, variant)) {
                        console.log("âŒ Not matching part:", variant);
                        continue;
                    }

                    const price = parsePrice(bodyText);

                    if (!price || price < 10) {
                        console.log("âŒ Invalid price");
                        continue;
                    }

                    console.log("âœ” CORRECT Supercheap Price:", price);

                    await browser.close();

                    return [{
                        partNumber,
                        supplier: "Supercheap Auto",
                        region: "AU",
                        price_aud: price,
                        delivery_days: 2,
                        availability: "in_stock",
                        source: "SUPERCHEAP_STRICT",

                        productText: bodyText,
                        productTitle: bodyText.substring(0, 200)
                    }];

                } catch {
                    console.log("âš  Failed product");
                }
            }
        }

        await browser.close();

        console.log("âŒ No matching Supercheap part");

        return [];

    } catch (err) {

        console.log("âŒ Supercheap failed:", err.message);

        if (browser) await browser.close();

        return [];
    }
}

module.exports = { fetchSupercheap };
