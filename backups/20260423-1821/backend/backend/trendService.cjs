//
// File: backend/trendService.cjs
// JustDefenders ©
// Phase 5J — Price trend + recommendation engine
//

const fs = require("fs");

const HISTORY_FILE = "./backend/priceHistory.json";

function loadHistory() {
    try {
        return JSON.parse(fs.readFileSync(HISTORY_FILE));
    } catch {
        return {};
    }
}

function getRecentPrices(partNumber) {

    const history = loadHistory();

    if (!history[partNumber] || history[partNumber].length < 2) {
        return [];
    }

    // flatten latest supplier prices
    return history[partNumber].slice(-5).map(entry => {
        const prices = entry.suppliers
            .filter(s => s.price_aud !== undefined)
            .map(s => s.price_aud);

        return prices.length > 0 ? Math.min(...prices) : null;
    }).filter(Boolean);
}

function analyzeTrend(partNumber) {

    const prices = getRecentPrices(partNumber);

    if (prices.length < 2) {
        return {
            trend: "unknown",
            recommendation: "BUY",
            confidence: 0.5
        };
    }

    const first = prices[0];
    const last = prices[prices.length - 1];

    if (last < first) {
        return {
            trend: "falling",
            recommendation: "WAIT",
            confidence: 0.9
        };
    }

    if (last > first) {
        return {
            trend: "rising",
            recommendation: "BUY_NOW",
            confidence: 0.9
        };
    }

    return {
        trend: "stable",
        recommendation: "BUY",
        confidence: 0.7
    };
}

module.exports = { analyzeTrend };