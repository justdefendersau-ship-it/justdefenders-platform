"use client";

// =====================================================
// JustDefenders ©
// File: SupplierAnalytics.tsx
// Purpose: Display supplier performance metrics
// =====================================================

type Props = {
  analytics: any;
};

export default function SupplierAnalytics({ analytics }: Props) {
  if (!analytics) return null;

  return (
    <div className="panel">
      <div className="text-sm text-gray-400 mb-2">
        Performance
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">

        <div>
          <div className="text-gray-400">Visits</div>
          <div className="text-xl font-bold">
            {analytics.visits}
          </div>
        </div>

        <div>
          <div className="text-gray-400">Buys</div>
          <div className="text-xl font-bold">
            {analytics.buys}
          </div>
        </div>

        <div>
          <div className="text-gray-400">Conversion</div>
          <div className="text-xl font-bold">
            {(analytics.conversion_rate * 100).toFixed(1)}%
          </div>
        </div>

        <div>
          <div className="text-gray-400">Revenue</div>
          <div className="text-xl font-bold text-green-500">
            ${analytics.estimated_revenue}
          </div>
        </div>

      </div>
    </div>
  );
}