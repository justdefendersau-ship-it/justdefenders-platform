/*
============================================================
JustDefenders
AI Resale Price Optimizer
Date: 23 Feb 2026
============================================================
*/

import { NextResponse } from "next/server"
import OpenAI from "openai"

export async function POST(req: Request) {

  const body = await req.json()
  const { vehicle, marketData } = body

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  const response =
    await openai.responses.create({
      model: "gpt-4.1",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text:
                `Vehicle details:
                 ${JSON.stringify(vehicle)}

                 Market band:
                 ${JSON.stringify(marketData)}

                 Suggest:
                 1. Optimal listing price
                 2. Quick sale price
                 3. Premium retail price
                 4. Short justification`
            }
          ]
        }
      ]
    })

  return NextResponse.json({
    result: response.output_text
  })
}