/**
 * JustDefenders ©
 * File: distanceEngine.cjs
 * Description: Adds distance calculation + delivery modelling
 */

const SYDNEY_COORDS = {
  lat: -33.8688,
  lon: 151.2093
};

// Mock supplier warehouse locations
const SUPPLIER_COORDS = {
  "Repco": { lat: -33.8688, lon: 151.2093 },        // Sydney
  "Supercheap Auto": { lat: -37.8136, lon: 144.9631 }, // Melbourne
  "Burson": { lat: -27.4698, lon: 153.0251 },       // Brisbane
  "Britcar": { lat: 51.5074, lon: -0.1278 },        // London
  "eBay Seller": { lat: 40.7128, lon: -74.0060 }    // New York
};

// Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function toRad(value) {
  return (value * Math.PI) / 180;
}

function enrichWithDistance(supplier) {
  const coords = SUPPLIER_COORDS[supplier.name];

  if (!coords) {
    return {
      ...supplier,
      distanceKm: null
    };
  }

  const distanceKm = calculateDistance(
    SYDNEY_COORDS.lat,
    SYDNEY_COORDS.lon,
    coords.lat,
    coords.lon
  );

  // Delivery adjustment based on distance
  let deliveryDays = supplier.deliveryDays;

  if (distanceKm < 50) {
    deliveryDays -= 1;
  } else if (distanceKm < 1000) {
    deliveryDays += 1;
  } else if (distanceKm < 10000) {
    deliveryDays += 3;
  } else {
    deliveryDays += 5;
  }

  return {
    ...supplier,
    distanceKm: Math.round(distanceKm),
    deliveryDays: Math.max(1, deliveryDays)
  };
}

function applyDistance(suppliers) {
  return suppliers.map(enrichWithDistance);
}

module.exports = {
  applyDistance
};
