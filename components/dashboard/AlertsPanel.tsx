// JustDefenders ©
// File: /components/dashboard/AlertsPanel.tsx
// Timestamp: 29 March 2026 22:40 (Sydney)
// PURPOSE: FINAL INTELLIGENT ALERT ENGINE (REAL FUEL EFFICIENCY)

import { createSupabaseServerClient } from "@/lib/supabaseServer";

type Alert = {
  message: string;
  level: "info" | "warning" | "critical";
};

export default async function AlertsPanel() {
  const supabase = createSupabaseServerClient();

  const alerts: Alert[] = [];
  const now = new Date();

  // 🔹 SERVICE + FAULT LOGIC
  const { data: services } = await supabase
    .from("activity_logs")
    .select("vehicle_id, description, created_at");

  services?.forEach((entry: any) => {
    const desc = entry.description?.toLowerCase() || "";

    if (desc.includes("service")) {
      const lastService = new Date(entry.created_at);
      const diffDays =
        (now.getTime() - lastService.getTime()) / (1000 * 60 * 60 * 24);

      if (diffDays > 180) {
        alerts.push({
          message: "Service overdue",
          level: "warning",
        });
      }
    }

    if (desc.includes("failure") || desc.includes("fault")) {
      alerts.push({
        message: "Critical fault detected",
        level: "critical",
      });
    }
  });

  // 🔹 FUEL EFFICIENCY ENGINE (REAL LOGIC)
  const { data: fuelLogs, error: fuelError } = await supabase
    .from("fuel_logs")
    .select("vehicle_id, odometer, litres, created_at")
    .order("created_at", { ascending: false })
    .limit(20);

  if (fuelError) {
    alerts.push({
      message: `Fuel Error: ${fuelError.message}`,
      level: "info",
    });
  }

  if (fuelLogs && fuelLogs.length > 2) {
    const efficiencies: number[] = [];

    for (let i = 0; i < fuelLogs.length - 1; i++) {
      const current = fuelLogs[i];
      const previous = fuelLogs[i + 1];

      const distance = current.odometer - previous.odometer;

      if (distance > 0 && current.litres > 0) {
        const efficiency = distance / current.litres; // km per litre
        efficiencies.push(efficiency);
      }
    }

    if (efficiencies.length > 2) {
      const avg =
        efficiencies.reduce((a, b) => a + b, 0) / efficiencies.length;

      const latest = efficiencies[0];

      // Debug output (keep for now)
      alerts.push({
        message: `Fuel avg: ${avg.toFixed(2)} km/L`,
        level: "info",
      });

      alerts.push({
        message: `Fuel latest: ${latest.toFixed(2)} km/L`,
        level: "info",
      });

      // 🚨 REAL ANOMALY DETECTION
      if (latest < avg * 0.7) {
        alerts.push({
          message: "Fuel efficiency anomaly detected",
          level: "warning",
        });
      }

      // 🔥 EXTREME CASE (serious issue)
      if (latest < avg * 0.5) {
        alerts.push({
          message: "Severe fuel efficiency drop",
          level: "critical",
        });
      }
    }
  }

  // 🔹 FALLBACK
  if (alerts.length === 0) {
    alerts.push({
      message: "No active alerts",
      level: "info",
    });
  }

  // 🔹 UI
  const getColor = (level: string) => {
    switch (level) {
      case "critical":
        return "text-red-600";
      case "warning":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div>
      <h2 className="font-semibold mb-3">
        Alerts
      </h2>

      <ul className="space-y-1 text-sm">
        {alerts.map((alert, index) => (
          <li key={index} className={getColor(alert.level)}>
            {alert.message}
          </li>
        ))}
      </ul>
    </div>
  );
}