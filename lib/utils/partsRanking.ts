// =====================================================
// JustDefenders ©
// File: /lib/utils/partsRanking.ts
// Timestamp: 22 March 2026 10:40 (Sydney)
// Purpose: Ranking with supplier performance score
// =====================================================

type Part = {
  name: string;
  price: number;
  supplier: string;
  supplier_score?: number;
  distance_km: number;
  rating: number;
};

export function rankParts(parts: Part[]) {
  if (!parts || parts.length === 0) return [];

  const maxPrice = Math.max(...parts.map((p) => p.price));
  const minPrice = Math.min(...parts.map((p) => p.price));

  const maxDistance = Math.max(...parts.map((p) => p.distance_km));
  const minDistance = Math.min(...parts.map((p) => p.distance_km));

  return parts
    .map((p) => {
      const priceScore =
        maxPrice === minPrice
          ? 1
          : 1 - (p.price - minPrice) / (maxPrice - minPrice);

      const distanceScore =
        maxDistance === minDistance
          ? 1
          : 1 - (p.distance_km - minDistance) / (maxDistance - minDistance);

      const ratingScore = p.rating / 5;

      const supplierScore = p.supplier_score || 0;

      // ------------------------------------------------
      // FINAL SCORE (UPDATED)
      // ------------------------------------------------
      const score =
        priceScore * 0.35 +
        distanceScore * 0.15 +
        ratingScore * 0.2 +
        supplierScore * 0.3; // NEW: performance boost

      return {
        ...p,
        score,
      };
    })
    .sort((a, b) => b.score - a.score)
    .map((p, index) => ({
      ...p,
      isBest: index === 0,
    }));
}