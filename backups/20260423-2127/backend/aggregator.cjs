//
// File: backend/aggregator.cjs
// JustDefenders ©
// Phase 6J.1 — Aggregator (Repco integrated clean)
//

const { fetchRepco } = require('./repcoConnector.cjs');

async function fetchAllSuppliers(partNumber) {

    console.log("=== RUNNING SUPPLIERS ===");

    const results = [];

    try {
        const repco = await fetchRepco(partNumber);
        results.push(...repco);
    } catch {
        console.log("Repco failed");
    }

    return results;
}

module.exports = { fetchAllSuppliers };