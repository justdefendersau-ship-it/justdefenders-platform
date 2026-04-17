// Timestamp: 1 March 2026 17:36
// Stripe Server Client (App Router Safe)

import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY")
}

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY,
  {
    apiVersion: "2023-10-16"
  }
)