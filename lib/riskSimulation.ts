// Timestamp: 1 March 2026 17:22
// Monte Carlo Risk Simulation

export function monteCarloRisk(
  iterations: number,
  volatility: number,
  baseLoss: number
): number {
  let total = 0

  for (let i = 0; i < iterations; i++) {
    const randomShock = (Math.random() - 0.5) * volatility
    total += baseLoss + randomShock
  }

  return total / iterations
}