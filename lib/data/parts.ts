// =====================================================
// JustDefenders ©
// Patch: mapActionToPart (STUB)
// Timestamp: 22 March 2026 16:32 (Sydney)
// =====================================================

export function mapActionToPart(action: string) {
  // Minimal safe fallback
  return {
    category: "general",
    keywords: [action],
  };
}

export async function getPartsForCategoryWithLocation(
  category: string,
  userLat: number,
  userLon: number
) {
  const { data, error } = await supabase
    .from("parts")
    .select(`
      id,
      name,
      price,
      suppliers (
        id,
        name,
        rating,
        score,
        latitude,
        longitude
      )
    `)
    .eq("category", category);

  if (error || !data) {
    console.error("getPartsForCategoryWithLocation error:", error);
    return [];
  }

  return data.map((p: any) => {
    const s = p.suppliers;

    const distance =
      s.latitude && s.longitude
        ? calculateDistance(
            userLat,
            userLon,
            s.latitude,
            s.longitude
          )
        : 999;

    return {
      name: p.name,
      price: p.price,
      supplier: s.name,
      supplier_id: s.id,
      rating: s.rating,
      supplier_score: s.score || 0,
      distance_km: Math.round(distance),
    };
  });
}