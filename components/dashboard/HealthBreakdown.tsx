
// =====================================================
// JustDefenders ©
// File: HealthBreakdown.tsx
// =====================================================

type Props = {
  breakdown: any;
};

export default function HealthBreakdown({ breakdown }: Props) {
  if (!breakdown) return null;

  return (
    <div className="panel mt-4">
      <div className="text-sm text-gray-400 mb-2">
        Health Breakdown
      </div>

      <div className="space-y-1 text-sm">

        <div className="flex justify-between">
          <span>Alert Penalty</span>
          <span className="text-red-500">-{breakdown.alert_penalty}</span>
        </div>

        <div className="flex justify-between">
          <span>Severity Impact</span>
          <span className="text-red-500">-{breakdown.severity_penalty}</span>
        </div>

        <div className="flex justify-between">
          <span>Activity Bonus</span>
          <span className="text-green-500">+{breakdown.activity_bonus}</span>
        </div>

        <div className="flex justify-between">
          <span>Recency Penalty</span>
          <span className="text-red-500">-{breakdown.recency_penalty}</span>
        </div>

      </div>
    </div>
  );
}