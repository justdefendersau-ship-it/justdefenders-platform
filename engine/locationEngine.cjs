/**
 * JustDefenders ©
 * File: locationEngine.cjs
 * Description: Adds AU/INT region + mock delivery modelling
 */

const USER_LOCATION = "Sydney";

function enrichWithLocation(supplier) {
  // Mock supplier regions (controlled for now)
  const AU_SUPPLIERS = ["Repco", "Burson", "Supercheap Auto"];

  const isAU = AU_SUPPLIERS.includes(supplier.name);

  const region = isAU ? "AU" : "INT";

  // Mock delivery logic
  let deliveryDays = supplier.deliveryDays || 5;

  if (region === "AU") {
    deliveryDays = Math.max(1, deliveryDays - 2);
  } else {
    deliveryDays = deliveryDays + 2;
  }

  return {
    ...supplier,
    region,
    userLocation: USER_LOCATION,
    deliveryDays
  };
}

function applyLocationContext(suppliers) {
  return suppliers.map(enrichWithLocation);
}

module.exports = {
  applyLocationContext
};
