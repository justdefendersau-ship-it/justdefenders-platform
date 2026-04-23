export async function searchEbay(query:string) {

  const url = `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${query}&limit=5`;

  const res = await fetch(url, {
    headers: {
      "Authorization": "Bearer YOUR_EBAY_TOKEN"
    }
  });

  if (!res.ok) return [];

  const data = await res.json();

  return data.itemSummaries?.map((item:any) => ({
    supplier: "eBay",
    partNumber: item.title,
    price: Math.round(item.price.value),
    deliveryDays: 5,
    type: "online",
    location: null
  })) || [];
}