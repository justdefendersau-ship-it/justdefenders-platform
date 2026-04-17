// =====================================================
// JustDefenders ©
// File: /app/api/stripe/webhook/route.ts
// Timestamp: 22 March 2026 11:30 (Sydney)
// Purpose: Handle Stripe subscription events
// =====================================================

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabaseClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  const supabase = createClient();

  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // ----------------------------------------------------
  // HANDLE SUBSCRIPTION UPDATE
  // ----------------------------------------------------
  if (event.type === "customer.subscription.updated") {
    const sub = event.data.object as Stripe.Subscription;

    const supplierId = sub.metadata.supplier_id;
    const plan = sub.items.data[0].price.nickname?.toLowerCase();

    await supabase.from("supplier_subscriptions").upsert({
      supplier_id: supplierId,
      stripe_subscription_id: sub.id,
      stripe_customer_id: sub.customer,
      plan,
      status: sub.status,
      current_period_end: new Date(sub.current_period_end * 1000),
    });

    // sync tier
    await supabase.rpc("sync_supplier_tier", {
      s_id: supplierId,
    });
  }

  return NextResponse.json({ received: true });
}