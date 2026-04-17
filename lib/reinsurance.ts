// Timestamp: 1 March 2026 17:21
// Reinsurance Calculation Logic

export function calculateReinsurancePremium(
  baseRisk: number,
  coverageLimit: number,
  loadingFactor: number
): number {
  return baseRisk * coverageLimit * (1 + loadingFactor)
}