/*
Timestamp: 5 March 2026 12:38
File: app/api/billing/create-checkout/route.ts

Stripe Checkout Session

Purpose
-------
Creates subscription checkout sessions
for platform tiers.

Supported plans
---------------
club
fleet
enterprise
insurance
*/

import Stripe from "stripe"
import { NextResponse } from "next/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {

  const body = await req.json()

  const { priceId } = body

  const session = await stripe.checkout.sessions.create({

    mode: "subscription",

    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],

    success_url: "http://localhost:3000/dashboard",
    cancel_url: "http://localhost:3000/billing"

  })

  return NextResponse.json({
    url: session.url
  })

}