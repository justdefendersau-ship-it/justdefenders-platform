// Timestamp 6 March 2026 23:25
// File: /lib/copilot-query-planner.ts

/*
Reliability AI Copilot Query Planner

Determines which datasets to query
based on the user's question.
*/

export function planQuery(question:string){

const q = question.toLowerCase()

if(q.includes("supplier")){

 return {
  dataset:"supplier_failure_stats",
  type:"supplier_analysis"
 }

}

if(q.includes("component") || q.includes("part")){

 return {
  dataset:"component_failure_stats",
  type:"component_analysis"
 }

}

if(q.includes("fleet")){

 return {
  dataset:"fleet_failure_stats",
  type:"fleet_analysis"
 }

}

if(q.includes("vehicle")){

 return {
  dataset:"vin_failure_predictions",
  type:"vehicle_analysis"
 }

}

return {
 dataset:"defender_reliability_index",
 type:"general_reliability"
}

}