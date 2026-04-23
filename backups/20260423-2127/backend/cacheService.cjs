//
// File: backend/cacheService.cjs
// JustDefenders ©
// Phase 5I — In-memory + file cache
//

const fs = require("fs");

const CACHE_FILE = "./backend/cache.json";
const TTL_MS = 1000 * 60 * 60; // 1 hour

function loadCache() {
    try {
        return JSON.parse(fs.readFileSync(CACHE_FILE));
    } catch {
        return {};
    }
}

function saveCache(cache) {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

function getCached(partNumber) {
    const cache = loadCache();

    if (!cache[partNumber]) return null;

    const age = Date.now() - cache[partNumber].timestamp;

    if (age > TTL_MS) return null;

    return cache[partNumber].data;
}

function setCache(partNumber, data) {
    const cache = loadCache();

    cache[partNumber] = {
        timestamp: Date.now(),
        data
    };

    saveCache(cache);
}

module.exports = { getCached, setCache };