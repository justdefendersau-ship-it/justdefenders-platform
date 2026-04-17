/**
 * JustDefenders ©
 * File: supplierAdapter.cjs
 * Description: Normalises external supplier data into platform model
 */

// Example: Repco API adapter (mock structure)
function repcoAdapter(raw) {
  return {
    name: "Repco",
    part: raw.partNumber,
    price: raw.price,
    shipping: raw.shipping || 15,
    rating: raw.rating || 4.5,
    deliveryDays: raw.deliveryEstimate || 3
  };
}

// Example: Generic API adapter
function genericAdapter(raw, supplierName) {
  return {
    name: supplierName,
    part: raw.part,
    price: raw.price,
    shipping: raw.shipping || 20,
    rating: raw.rating || 4.0,
    deliveryDays: raw.deliveryDays || 5
  };
}

function normaliseSupplierData(rawDataArray, supplierName) {
  return rawDataArray.map(raw => {
    switch (supplierName) {
      case "Repco":
        return repcoAdapter(raw);
      default:
        return genericAdapter(raw, supplierName);
    }
  });
}

module.exports = {
  normaliseSupplierData
};