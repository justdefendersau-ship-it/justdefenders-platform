// JustDefenders ©
// File: /components/dashboard/QuickActions.tsx
// Timestamp: 29 March 2026 20:50 (Sydney)
// PURPOSE: FIX QUICK ACTIONS TO SINGLE ROW (6 BUTTONS INLINE)

export default function QuickActions() {
  const actions = [
    "Add Vehicle",
    "Log Fuel",
    "Maintenance",
    "Parts",
    "Trips",
    "Service",
  ];

  return (
    <div>
      <h2 className="font-semibold mb-3">
        Quick Actions
      </h2>

      {/* SINGLE ROW — 6 BUTTONS */}
      <div className="flex gap-3 flex-wrap lg:flex-nowrap">
        {actions.map((action, index) => (
          <button
            key={index}
            className="flex-1 border rounded-md p-2 text-sm hover:bg-gray-100 transition text-center whitespace-nowrap"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}