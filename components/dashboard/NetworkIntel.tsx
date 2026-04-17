// JustDefenders ©
// File: /components/dashboard/NetworkIntel.tsx
// Timestamp: 29 March 2026 20:37 (Sydney)
// PURPOSE: NETWORK INTELLIGENCE SIGNAL FEED (NO LAYOUT CONTROL)

type SignalType = "info" | "warning" | "critical";

interface Signal {
  label: string;
  type: SignalType;
}

export default function NetworkIntel() {
  const signals: Signal[] = [
    { label: "Supplier update", type: "info" },
    { label: "Price fluctuation", type: "warning" },
    { label: "Failure detected", type: "critical" },
    { label: "Market shift", type: "info" },
  ];

  const getColor = (type: SignalType) => {
    switch (type) {
      case "info":
        return "bg-blue-500";
      case "warning":
        return "bg-yellow-500";
      case "critical":
        return "bg-red-500";
    }
  };

  return (
    <div>
      <h2 className="font-semibold mb-3">
        Network Intelligence
      </h2>

      <ul className="space-y-2 text-sm">
        {signals.map((signal, index) => (
          <li key={index} className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${getColor(signal.type)}`}
            />
            <span>{signal.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}