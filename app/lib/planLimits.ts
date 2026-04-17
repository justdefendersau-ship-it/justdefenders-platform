export function getPlanLimits(plan: string) {

  switch (plan) {

    case "pro":
      return {
        vehicles: 5,
        analytics: true,
        marketValue: true
      }

    case "fleet":
      return {
        vehicles: 999,
        analytics: true,
        marketValue: true
      }

    default:
      return {
        vehicles: 1,
        analytics: false,
        marketValue: false
      }
  }
}