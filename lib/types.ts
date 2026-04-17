// =====================================================
// JustDefenders ©
// File: /lib/types.ts
// Timestamp: 21 March 2026 21:15 (Sydney)
// Purpose: Centralised platform data types
// =====================================================

// -----------------------------
// VEHICLE
// -----------------------------
export type Vehicle = {
  id: string;
  user_id: string;

  name: string;
  model?: string;
  year?: number;

  health_score?: number; // future intelligence layer

  created_at: string;
};

// -----------------------------
// ACTIVITY LOG
// -----------------------------
export type ActivityLog = {
  id: string;
  user_id: string;

  vehicle_id?: string;

  type: string; // maintenance, fuel, alert, etc
  description: string;

  date: string;
  created_at: string;
};

// -----------------------------
// ALERT
// -----------------------------
export type Alert = {
  id: string;
  user_id: string;

  vehicle_id?: string;

  severity: "low" | "medium" | "high";
  message: string;

  status?: "active" | "resolved";

  created_at: string;
};

// -----------------------------
// NETWORK EVENT
// -----------------------------
export type NetworkEvent = {
  id: string;

  type: string; // part failure, supplier update, etc
  description: string;

  region?: string;

  date: string;
};