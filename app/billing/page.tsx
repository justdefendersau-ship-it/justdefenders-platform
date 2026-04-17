/*
Timestamp: 5 March 2026 12:42
File: app/billing/page.tsx

Purpose
-------
Displays subscription tiers
and launches Stripe checkout.
*/

"use client"

export default function BillingPage() {

  async function subscribe(priceId: string) {

    const res = await fetch("/api/billing/create-checkout", {
      method: "POST",
      body: JSON.stringify({ priceId })
    })

    const data = await res.json()

    window.location.href = data.url

  }

  return (

    <div className="max-w-4xl mx-auto p-10 space-y-6">

      <h1 className="text-2xl font-semibold">
        Subscription Plans
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="border rounded-lg p-6">

          <h2 className="font-semibold mb-2">Club</h2>

          <button
            onClick={() => subscribe("price_club")}
            className="border px-3 py-1 rounded"
          >
            Subscribe
          </button>

        </div>

        <div className="border rounded-lg p-6">

          <h2 className="font-semibold mb-2">Fleet</h2>

          <button
            onClick={() => subscribe("price_fleet")}
            className="border px-3 py-1 rounded"
          >
            Subscribe
          </button>

        </div>

        <div className="border rounded-lg p-6">

          <h2 className="font-semibold mb-2">Enterprise</h2>

          <button
            onClick={() => subscribe("price_enterprise")}
            className="border px-3 py-1 rounded"
          >
            Subscribe
          </button>

        </div>

      </div>

    </div>

  )

}