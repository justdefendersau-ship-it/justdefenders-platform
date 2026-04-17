// panelRegistry.ts
// Timestamp: 10 March 2026 15:45
// Commentary:
// Central registry of all Command Center panels.

import FleetHealthGauge from "./FleetHealthGauge"
import FailureClusterPanel from "./FailureClusterPanel"
import SupplierReliabilityLeaderboard from "./SupplierReliabilityLeaderboard"
import AIFailurePredictionPanel from "./AIFailurePredictionPanel"
import SystemStatusPanel from "./SystemStatusPanel"
import HarvesterActivityPanel from "./HarvesterActivityPanel"
import EngineMonitorPanel from "./EngineMonitorPanel"

export const commandCenterPanels = [

 { id: "fleet-health", component: FleetHealthGauge },

 { id: "failure-clusters", component: FailureClusterPanel },

 { id: "supplier-reliability", component: SupplierReliabilityLeaderboard },

 { id: "ai-failure", component: AIFailurePredictionPanel },

 { id: "system-status", component: SystemStatusPanel },

 { id: "harvester-activity", component: HarvesterActivityPanel },

 { id: "engine-monitor", component: EngineMonitorPanel }

]