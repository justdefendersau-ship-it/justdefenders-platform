export function rankSuppliers(list) {

  if (!list || list.length === 0) return [];

  // calculate total cost first
  const enriched = list.map(s => ({
    ...s,
    totalCost: (s.price || 0) + (s.shipping || 0)
  }));

  const maxCost = Math.max(...enriched.map(s => s.totalCost));
  const maxDistance = Math.max(...enriched.map(s => s.distance || 0));

  return enriched
    .map(s => {

      const costScore = maxCost ? (1 - (s.totalCost / maxCost)) * 50 : 0;
      const ratingScore = (s.rating || 0) * 10;
      const deliveryScore = s.deliveryDays ? (1 / s.deliveryDays) * 20 : 0;
      const distanceScore = maxDistance ? (1 - (s.distance / maxDistance)) * 20 : 0;

      const totalScore = costScore + ratingScore + deliveryScore + distanceScore;

      return {
        ...s,
        score: totalScore
      };
    })
    .sort((a, b) => b.score - a.score);
}
