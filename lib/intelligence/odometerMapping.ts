// JustDefenders ©
// File: /lib/intelligence/odometerMapping.ts
// Timestamp: 30 March 2026 01:10

export function mapFailuresToOdometer(
  failures: any[],
  fuelLogs: any[]
) {
  return failures.map((failure) => {
    const nearest = fuelLogs
      .filter((f) => f.vehicle_id === failure.vehicle_id)
      .reduce((prev, curr) => {
        return Math.abs(new Date(curr.created_at).getTime() - new Date(failure.created_at).getTime()) <
          Math.abs(new Date(prev.created_at).getTime() - new Date(failure.created_at).getTime())
          ? curr
          : prev
      })

    return {
      ...failure,
      odometer: nearest?.odometer || 0,
    }
  })
}