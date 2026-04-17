// featureRegistry.ts
// Timestamp: 10 March 2026 00:25
// Commentary:
// Central registry for all platform features.

export type Feature = {

 id: string
 name: string
 route: string
 category: string
 icon?: string

}

export const features: Feature[] = [

 {
  id: "parts-search",
  name: "Parts Search",
  route: "/member/parts-search",
  category: "member"
 },

 {
  id: "my-shed",
  name: "My Shed",
  route: "/member/shed",
  category: "member"
 },

 {
  id: "fuel-dashboard",
  name: "Fuel Dashboard",
  route: "/member/fuel",
  category: "member"
 },

 {
  id: "maintenance",
  name: "Maintenance Tracker",
  route: "/member/maintenance",
  category: "member"
 },

 {
  id: "trips",
  name: "Trip Log",
  route: "/member/trips",
  category: "member"
 },

 {
  id: "running-costs",
  name: "Running Costs",
  route: "/member/costs",
  category: "member"
 },

 {
  id: "community-expeditions",
  name: "Expeditions",
  route: "/community/expeditions",
  category: "community"
 },

 {
  id: "community-routes",
  name: "Routes Map",
  route: "/community/routes",
  category: "community"
 },

 {
  id: "command-center",
  name: "Command Center",
  route: "/analytics/command-center",
  category: "analytics"
 }

]