// api.ts
// Timestamp: 11 March 2026 09:50
// Commentary:
// Central API endpoint configuration used throughout the platform.

import { ENV } from "./env"

export const API = {

 BASE: ENV.API_URL,

 MEMBER: {

  VEHICLE_DASHBOARD: `${ENV.API_URL}/member/vehicle/dashboard`,

  FUEL_ADD: `${ENV.API_URL}/member/fuel/add`,

  TRIP_ADD: `${ENV.API_URL}/member/trips/add`

 },

 ADMIN: {

  HARVESTER_STATUS: `${ENV.API_URL}/admin/harvester-status`,

  ENGINE_STATUS: `${ENV.API_URL}/admin/engine-status`

 }

}