/*
Timestamp: 5 March 2026 11:25
File: app/components/AnalyticsCard.tsx

Purpose
-------
Reusable analytics metric card used across the Stripe-style dashboard.

Displays:
• Metric title
• Large metric value
• Optional subtitle

This component standardizes dashboard UI blocks.
*/

type Props = {
  title: string
  value: number | string
  subtitle?: string
}

export default function AnalyticsCard({
  title,
  value,
  subtitle
}: Props) {

  return (

    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

      <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">
        {title}
      </p>

      <p className="text-3xl font-semibold text-gray-900">
        {value}
      </p>

      {subtitle && (
        <p className="text-sm text-gray-500 mt-2">
          {subtitle}
        </p>
      )}

    </div>

  )

}