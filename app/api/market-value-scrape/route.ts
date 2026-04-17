/*
============================================================
JustDefenders
Enterprise Market Scraper + Confidence Band
Date: 23 Feb 2026
============================================================
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import * as cheerio from "cheerio"

function percentile(arr: number[], p: number) {
  const index = Math.floor(arr.length * p)
  return arr[index]
}

export async function POST(req: Request) {

  const body = await req.json()
  const { vehicleId } = body

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: vehicle } =
    await supabase
      .from("vehicles")
      .select("*")
      .eq("id", vehicleId)
      .single()

  if (!vehicle)
    return NextResponse.json({ error: "Vehicle not found" }, { status: 400 })

  const query =
    `${vehicle.year} ${vehicle.make} ${vehicle.model}`
      .replace(/\s+/g, "+")

  const url =
    `https://www.carsales.com.au/cars/?q=${query}`

  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }
  })

  const html = await response.text()
  const $ = cheerio.load(html)

  const prices: number[] = []

  $("span").each((_, el) => {
    const text = $(el).text()
    const match = text.match(/\$[\d,]+/)
    if (match) {
      const value =
        parseInt(match[0]
          .replace("$", "")
          .replace(/,/g, ""))
      if (value > 5000 && value < 300000)
        prices.push(value)
    }
  })

  if (prices.length < 3)
    return NextResponse.json({
      error: "Not enough listings"
    }, { status: 400 })

  prices.sort((a, b) => a - b)

  const low = percentile(prices, 0.25)
  const median = percentile(prices, 0.50)
  const high = percentile(prices, 0.75)

  await supabase
    .from("vehicles")
    .update({
      estimated_market_value: median,
      market_value_source: "Carsales Scrape",
      market_value_last_updated: new Date()
    })
    .eq("id", vehicleId)

  await supabase
    .from("market_value_history")
    .insert({
      vehicle_id: vehicleId,
      organization_id: vehicle.organization_id,
      low_value: low,
      median_value: median,
      high_value: high,
      source: "Carsales Scrape"
    })

  return NextResponse.json({
    low,
    median,
    high,
    listings: prices.length
  })
}