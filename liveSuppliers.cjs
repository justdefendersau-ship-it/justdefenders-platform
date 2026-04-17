const fetch = require("node-fetch");

async function searchEbay(query) {

  const url = `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(query)}&limit=5`;

  // NOTE: requires eBay API key (replace below)
  const res = await fetch(url, {
    headers: {
      "Authorization": "Bearer YOUR_EBAY_TOKEN",
      "Content-Type": "application/json"
    }
  });

  const data = await res.json();

  if (!data.itemSummaries) return [];

  return data.itemSummaries.map(item => ({
    name: "eBay",
    part: item.title,
    price: parseFloat(item.price.value),
    shipping: item.shippingOptions?.[0]?.shippingCost?.value || 0,
    rating: 4.2,
    stock: 1,
    distance: 999,
    deliveryDays: 5,
    url: item.itemWebUrl
  }));
}

module.exports = { searchEbay };
