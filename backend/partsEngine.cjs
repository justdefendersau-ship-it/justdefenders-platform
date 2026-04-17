//
// File: backend/partsEngine.cjs
// JustDefenders ©
// Phase 9B.6 FIX — Reliable Fallback Engine
//

const fs = require("fs");
const path = require("path");

const { fetchRepco } = require('./repcoConnector.cjs');
const { fetchSupercheap } = require('./supercheapConnector.cjs');
const { buildVariants } = require('./crossReferenceEngine.cjs');
const { filterValidParts } = require('./validationEngine.cjs');
const { recordPrices } = require('./priceHistory.cjs');

function getFallback(partNumber) {

    try {

        const file = path.join(__dirname, "../data/priceHistory.json");

        if (!fs.existsSync(file)) return [];

        const raw = fs.readFileSync(file, "utf-8");

        const history = JSON.parse(raw);

        const match = history.reverse().find(h => h.partNumber === partNumber);

        if (!match) return [];

        console.log("✔ Using fallback price:", match.price_aud);

        return [{
            partNumber,
            supplier: "Repco",
            region: "AU",
            price_aud: match.price_aud,
            delivery_days: 2,
            availability: "estimated",
            source: "REPCO_FALLBACK"
        }];

    } catch (err) {

        console.log("❌ Fallback failed:", err.message);
        return [];
    }
}

async function runPartsEngine(partNumber) {

    console.log("=== PARTS ENGINE START ===");

    const cleaned = partNumber.replace(/[^a-zA-Z0-9]/g, '');

    let results = [];

    // ------------------------------------------------------------------------------------------
    // REPCO
    // ------------------------------------------------------------------------------------------

    let repcoResults = [];

    try {
        repcoResults = await fetchRepco(cleaned);
    } catch {
        console.log("Repco failed");
    }

    // 🔥 FALLBACK IF EMPTY
    if (!repcoResults || repcoResults.length === 0) {
        console.log("⚠ Repco failed — trying fallback");
        repcoResults = getFallback(cleaned);
    }

    results.push(...repcoResults);

    // ------------------------------------------------------------------------------------------
    // VARIANTS
    // ------------------------------------------------------------------------------------------

    const variants = buildVariants(cleaned, repcoResults);

    console.log("🔥 Auto Variants:", variants);

    // ------------------------------------------------------------------------------------------
    // SUPERCHEAP
    // ------------------------------------------------------------------------------------------

    try {
        const sc = await fetchSupercheap(cleaned, variants);
        results.push(...sc);
    } catch {
        console.log("Supercheap failed");
    }

    // ------------------------------------------------------------------------------------------
    // VALIDATION
    // ------------------------------------------------------------------------------------------

    console.log("🔎 Validating results...");

    const valid = filterValidParts(results);

    console.log("✔ Valid results:", valid.length);

    // ------------------------------------------------------------------------------------------
    // SAVE HISTORY
    // ------------------------------------------------------------------------------------------

    if (valid.length > 0) {
        recordPrices(valid);
    }

    return valid;
}

module.exports = { runPartsEngine };