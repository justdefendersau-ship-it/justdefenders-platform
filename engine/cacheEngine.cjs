/**
 * JustDefenders ©
 * File: cacheEngine.cjs
 * Description: Redis caching layer
 */

const { createClient } = require("redis");

const client = createClient({
  url: "redis://127.0.0.1:6379"
});

client.connect().catch(err => {
  console.error("Redis connection error:", err.message);
});

// TTL = 5 minutes
const CACHE_TTL = 300;

async function getCache(key) {
  try {
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Cache read error:", err.message);
    return null;
  }
}

async function setCache(key, value) {
  try {
    await client.setEx(key, CACHE_TTL, JSON.stringify(value));
  } catch (err) {
    console.error("Cache write error:", err.message);
  }
}

module.exports = {
  getCache,
  setCache
};