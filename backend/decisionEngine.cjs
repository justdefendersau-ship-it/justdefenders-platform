//
// File: backend/decisionEngine.cjs
// JustDefenders ©
// Phase 8N — Final Decision Engine (Clear + Transparent)
//

const { getTrend } = require('./trendEngine.cjs');

function makeDecision(results, originalPart) {

    if (!results || results.length === 0) {
        return {
            recommendedSupplier: null,
            confidence: 0,
            reasoning: "No valid parts found"
        };
    }

    // 🔥 Sort by price (cheapest wins)
    const sorted = results.sort((a, b) => a.price_aud - b.price_aud);

    const best = sorted[0];

    const trendData = getTrend(originalPart);

    let recommendation = "BUY";

    if (trendData.trend === "down") {
        recommendation = "WAIT";
    }

    if (best.price_aud <= trendData.lowest || trendData.lowest === null) {
        recommendation = "STRONG BUY";
    }

    return {
        recommendedSupplier: best.supplier,
        price_aud: best.price_aud,
        delivery_days: best.delivery_days,
        region: best.region,

        recommendation,
        trend: trendData.trend,
        lowestRecordedPrice: trendData.lowest,

        alternatives: results.length,
        confidence: 0.98
    };
}

module.exports = { makeDecision };