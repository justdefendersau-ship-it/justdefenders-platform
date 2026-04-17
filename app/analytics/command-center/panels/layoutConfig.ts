// layoutConfig.ts
// Timestamp: 9 March 2026 17:35
// Commentary:
// Defines the default layout order for Command Centre panels.
// This allows the dashboard layout to be changed without modifying page code.

export const layoutConfig = {

 "Fleet Intelligence": [

  "fleet-health",
  "failure-clusters",
  "fleet-risk"

 ],

 "Vehicle Intelligence": [

  "vehicle-health"

 ],

 "Maintenance Intelligence": [

  "predictive-maintenance",
  "ai-failure-prediction",
  "autonomous-reliability"

 ],

 "Parts Intelligence": [

  "supplier-reliability",
  "parts-recommendations",
  "autonomous-procurement",
  "my-shed"

 ],

 "Maps & Geospatial": [

  "global-reliability-map",
  "defender-intelligence-map"

 ]

}