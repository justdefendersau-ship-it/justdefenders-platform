import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const part = searchParams.get("part") || "";

  console.log("🔍 JLR SCRAPE START:", part);

  try {
    // Build direct product URL (known working pattern)
    const url = `https://parts.jaguarlandroverclassic.com/${part.toLowerCase()}-cartridge-engine-oil-filter.html`;

    console.log("🌐 Fetching:", url);

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const html = await res.text();

    // --------------------------------------------------------------------------------
    // SIMPLE EXTRACTION (string-based, fast + reliable)
    // --------------------------------------------------------------------------------

    // TITLE
    let title = "JLR Part";
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    if (titleMatch) {
      title = titleMatch[1].replace("| Jaguar Land Rover Classic Parts", "").trim();
    }

    // PRICE (grab first £ value)
    let price = "";
    const priceMatch = html.match(/£\s*\d+(\.\d+)?/);
    if (priceMatch) {
      price = priceMatch[0];
    }

    // IMAGE
    let image = "";
    const imgMatch = html.match(/<img[^>]+src="([^"]+product[^"]+)"/i);
    if (imgMatch) {
      image = imgMatch[1];
    }

    console.log("✅ JLR SCRAPED:", { title, price });

    return NextResponse.json({
      partNumber: part,
      title,
      price,
      image,
      url
    });

  } catch (err) {
    console.log("❌ JLR SCRAPE FAILED");

    return NextResponse.json({
      error: "JLR scrape failed"
    });
  }
}