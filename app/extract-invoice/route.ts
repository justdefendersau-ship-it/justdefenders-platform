/*
============================================================
JustDefenders
Invoice Extraction API
Date: 21 Feb 2026 13:05
============================================================
Server-side OpenAI invoice parsing
============================================================
*/

import { NextResponse } from "next/server"
import OpenAI from "openai"

export async function POST(req: Request) {

  try {

    const { text } = await req.json()

    if (!text) {
      return NextResponse.json(
        { error: "No text provided" },
        { status: 400 }
      )
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      messages: [
        {
          role: "system",
          content: `
Extract maintenance invoice data.
Return ONLY valid JSON in this exact structure:

{
  "date": "YYYY-MM-DD",
  "odometer": number,
  "description": "string",
  "cost": number
}

Rules:
- Convert date to ISO format YYYY-MM-DD
- Odometer must be numeric
- Cost must be numeric
- If any value is missing, return null
- Do NOT include explanations
- Do NOT include markdown
- Only return JSON
`
        },
        {
          role: "user",
          content: text
        }
      ]
    })

    const result =
      completion.choices[0].message.content

    return NextResponse.json({
      result
    })

  } catch (error) {

    console.error("Extraction error:", error)

    return NextResponse.json(
      { error: "Extraction failed" },
      { status: 500 }
    )
  }
}
