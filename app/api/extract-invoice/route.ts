/*
============================================================
JustDefenders
Server PDF Extraction Route (Markdown-Safe JSON)
Date: 21 Feb 2026 20:35
============================================================
✔ Handles markdown-wrapped JSON
✔ Strips ```json blocks safely
✔ Parses clean JSON
============================================================
*/

import { NextResponse } from "next/server"
import OpenAI from "openai"
import { toFile } from "openai"

export async function POST(req: Request) {

  try {

    const { filePath } = await req.json()

    if (!filePath) {
      throw new Error("Missing filePath")
    }

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL

    const serviceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceKey) {
      throw new Error("Missing Supabase environment variables")
    }

    // Download PDF from Supabase
    const fileResponse =
      await fetch(
        `${supabaseUrl}/storage/v1/object/invoices/${filePath}`,
        {
          headers: {
            apikey: serviceKey,
            Authorization: `Bearer ${serviceKey}`
          }
        }
      )

    if (!fileResponse.ok) {
      const errorText = await fileResponse.text()
      throw new Error(
        `Storage download failed: ${errorText}`
      )
    }

    const buffer =
      Buffer.from(await fileResponse.arrayBuffer())

    const openai =
      new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      })

    const fileForUpload =
      await toFile(
        buffer,
        "invoice.pdf",
        { type: "application/pdf" }
      )

    const uploadedFile =
      await openai.files.create({
        file: fileForUpload,
        purpose: "assistants"
      })

    const response =
      await openai.responses.create({
        model: "gpt-4.1",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_file",
                file_id: uploadedFile.id
              },
              {
                type: "input_text",
                text: `
Extract maintenance invoice data.
Return ONLY valid JSON (no markdown).
`
              }
            ]
          }
        ]
      })

    let output =
      response.output_text || ""

    // -------------------------------------------------------
    // CLEAN MARKDOWN WRAPPING IF PRESENT
    // -------------------------------------------------------

    output = output
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()

    const result =
      JSON.parse(output)

    return NextResponse.json({ result })

  } catch (error: any) {

    console.error("Extraction error:", error)

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Unknown extraction error"
      },
      { status: 500 }
    )
  }
}
