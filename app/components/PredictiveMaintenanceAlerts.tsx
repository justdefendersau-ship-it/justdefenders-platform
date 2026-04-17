/*
Timestamp: 5 March 2026 12:50
File: app/components/PredictiveMaintenanceAlerts.tsx

Purpose
-------
Displays predictive maintenance alerts generated from fleet analytics.

This panel highlights emerging component risks that may require
maintenance intervention before failure occurs.

Fleet operators and insurers use this panel to identify
imminent reliability risks across the fleet.
*/

"use client"

type Alert = {
  system: string
  message: string
  severity: "high" | "medium" | "low"
}

const alerts: Alert[] = [
  {
    system: "Turbocharger",
    message: "Failure probability increasing across fleet",
    severity: "high"
  },
  {
    system: "Fuel Injectors",
    message: "Injector degradation trend detected",
    severity: "medium"
  },
  {
    system: "Cooling System",
    message: "Temperature instability observed",
    severity: "medium"
  },
  {
    system: "Brake System",
    message: "Wear approaching service threshold",
    severity: "low"
  }
]

function severityColor(level: string) {

  if (level === "high") return "bg-red-100 text-red-700"
  if (level === "medium") return "bg-yellow-100 text-yellow-700"

  return "bg-green-100 text-green-700"

}

export default function PredictiveMaintenanceAlerts() {

  return (

    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

      <h2 className="text-lg font-semibold mb-4">
        Predictive Maintenance Alerts
      </h2>

      <div className="space-y-3">

        {alerts.map((alert, index) => (

          <div
            key={index}
            className="flex items-start justify-between border-b pb-3"
          >

            <div>

              <div className="font-medium text-gray-800">
                {alert.system}
              </div>

              <div className="text-sm text-gray-500">
                {alert.message}
              </div>

            </div>

            <div
              className={`text-xs font-semibold px-2 py-1 rounded ${severityColor(alert.severity)}`}
            >
              {alert.severity}
            </div>

          </div>

        ))}

      </div>

    </div>

  )

}