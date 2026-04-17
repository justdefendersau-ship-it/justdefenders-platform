/*
Timestamp: 6 March 2026 02:25
File: app/analytics/CommandCenter.tsx

Purpose
-------
Fleet Intelligence Command Center.

Displays the full analytics system:

• reliability score
• predictive alerts
• global heatmap
• reliability timeline
*/

"use client"

import GlobalReliabilityScore
from "./GlobalReliabilityScore"

import PredictiveMaintenanceAlerts
from "./PredictiveMaintenanceAlerts"

import GlobalFailureHeatmap
from "./GlobalFailureHeatmap"

import ReliabilityTimeline
from "./ReliabilityTimeline"

export default function CommandCenter(){

 return(

  <div className="space-y-6">

   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">

    <GlobalReliabilityScore/>

    <PredictiveMaintenanceAlerts/>

    <GlobalFailureHeatmap/>

    <ReliabilityTimeline/>

   </div>

  </div>

 )

}