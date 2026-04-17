//
// File: backend/lrWorkshopConnector.cjs
// JustDefenders ©
// Phase 6D — Safe mode (no crash)
//

const { chromium } = require('playwright');
const { getGBPtoAUD } = require('./fxService.cjs');

async function fetchLRWorkshop(partNumber) {

    console.log("=== LR WORKSHOP SAFE MODE ===");

    try {

        const fxRate = await getGBPtoAUD();

        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();

        const url = "https://www.lrworkshop.com/parts/" + partNumber;

        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });

        await browser.close();

        return []; // skip extraction for now

    } catch (err) {

        console.log("⚠ LR Workshop skipped (timeout)");

        return []; // DO NOT CRASH SYSTEM
    }
}

module.exports = { fetchLRWorkshop };