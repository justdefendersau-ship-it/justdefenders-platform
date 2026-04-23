export async function fetchAllSuppliers(query:string) {

  // SIMPLE SAFE FALLBACK (no API required yet)

  return [
    {
      supplier: "eBay",
      partNumber: query + " (used)",
      price: 180,
      deliveryDays: 5,
      type: "online"
    }
  ];

}