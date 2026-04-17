/**
 * JustDefenders ©
 * File: logisticsEngine.cjs
 * Description: Smart logistics (carrier + cost vs speed optimisation)
 */

// Carrier profiles
const CARRIERS = {
  AU_GROUND: {
    name: "AU Ground",
    speedFactor: 1.0,
    costFactor: 1.0
  },
  AU_EXPRESS: {
    name: "AU Express",
    speedFactor: 0.6,
    costFactor: 1.5
  },
  INT_AIR: {
    name: "International Air",
    speedFactor: 0.7,
    costFactor: 1.8
  },
  INT_ECONOMY: {
    name: "International Economy",
    speedFactor: 1.4,
    costFactor: 0.9
  }
};

function selectCarrier(supplier) {
  const { region = "INT", distanceKm = 1000 } = supplier;

  if (region === "AU") {
    if (distanceKm < 300) return CARRIERS.AU_GROUND;
    return CARRIERS.AU_EXPRESS;
  } else {
    if (distanceKm < 8000) return CARRIERS.INT_AIR;
    return CARRIERS.INT_ECONOMY;
  }
}

function applyLogistics(supplier) {
  const carrier = selectCarrier(supplier);

  let deliveryDays = Math.round(supplier.deliveryDays * carrier.speedFactor);
  deliveryDays = Math.max(1, deliveryDays);

  const shippingAdjusted = Math.round(supplier.shipping * carrier.costFactor);

  return {
    ...supplier,
    carrier: carrier.name,
    deliveryDays,
    shipping: shippingAdjusted
  };
}

function applySmartLogistics(suppliers) {
  return suppliers.map(applyLogistics);
}

module.exports = {
  applySmartLogistics
};