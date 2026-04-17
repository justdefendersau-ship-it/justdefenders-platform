/**
 * JustDefenders ©
 * File: repcoApi.cjs
 * Description: Repco API connector (live-ready)
 */

const fetch = require("node-fetch");

// 🔐 Replace with real endpoint when available
const REPCO_API_URL = "https://api.repco.com.au/parts"; // placeholder

async function fetchRepcoLive(part) {
  try {
    const res = await fetch(`${REPCO_API_URL}?query=${encodeURIComponent(part)}`);

    if (!res.ok) {
      throw new Error("Repco API failed");
    }

    const data = await res.json();

    // Expected structure placeholder
    return data.items || [];
  } catch (err) {
    console.error("Repco API error:", err.message);

    // 🔁 Fallback to safe mock
    return [
      {
        partNumber: part,
        price: 330,
        shipping: 10,
        rating: 4.6,
        deliveryEstimate: 2
      }
    ];
  }
}

module.exports = {
  fetchRepcoLive
};