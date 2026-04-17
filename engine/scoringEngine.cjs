/**
 * JustDefenders ©
 * File: scoringEngine.cjs
 * Description: Enhanced scoring with supplier intelligence
 */

function calculateScore(supplier) {
  const {
    rating = 0,
    price = 0,
    shipping = 0,
    deliveryDays = 0,
    region = "INT",
    reliabilityScore = 70,
    trustScore = 70
  } = supplier;

  const totalCost = price + shipping;
  const isAU = region === "AU";

  const score =
    (rating * 10)
    - totalCost
    - (deliveryDays * 8)
    + (isAU ? 30 : 0)
    + (reliabilityScore * 0.2)
    + (trustScore * 0.15);

  return {
    ...supplier,
    totalCost,
    score
  };
}

function rankSuppliers(suppliers) {
  const scored = suppliers.map(calculateScore);

  scored.sort((a, b) => b.score - a.score);

  return scored.map((s, index) => ({
    ...s,
    isBest: index === 0
  }));
}

module.exports = {
  calculateScore,
  rankSuppliers
};
