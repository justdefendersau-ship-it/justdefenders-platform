//
// File: backend/validationEngine.cjs
// JustDefenders ©
// Phase 9B.5 — Validation Fix (Preserve Original Part)
//

function filterValidParts(results) {

    if (!results || results.length === 0) return [];

    // ------------------------------------------------------------------------------------------
    // KEEP ALL VALID PRICES
    // ------------------------------------------------------------------------------------------

    let valid = results.filter(r =>
        r.price_aud &&
        r.price_aud > 10 &&
        r.price_aud < 10000
    );

    // ------------------------------------------------------------------------------------------
    // 🔥 CRITICAL: IF NOTHING LEFT → FALLBACK TO ORIGINAL RESULTS
    // ------------------------------------------------------------------------------------------

    if (valid.length === 0) {
        console.log("⚠ No validated results — returning raw suppliers");
        return results;
    }

    return valid;
}

module.exports = { filterValidParts };