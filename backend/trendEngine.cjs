//
// File: backend/trendEngine.cjs
// JustDefenders ©
// Phase 8C — Trend Analysis Engine
//

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "data", "priceHistory.json");

function loadHistory() {
    try {
        return JSON.parse(fs.readFileSync(filePath));
    } catch {
        return [];
    }
}

function getTrend(partNumber) {

    const history = loadHistory();

    const filtered = history
        .filter(h => h.partNumber === partNumber)
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    if (filtered.length < 2) {
        return {
            trend: "unknown",
            lowest: null
        };
    }

    const latest = filtered[filtered.length - 1].price;
    const previous = filtered[filtered.length - 2].price;

    let trend = "stable";

    if (latest > previous) trend = "up";
    if (latest < previous) trend = "down";

    const lowest = Math.min(...filtered.map(x => x.price));

    return {
        trend,
        lowest
    };
}

module.exports = { getTrend };