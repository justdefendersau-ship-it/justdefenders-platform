// Timestamp: 4 March 2026 20:25
// Simple logout route for Next.js 16 (no Supabase SSR dependency)

import { NextResponse } from "next/server"

export async function GET() {
  const response = NextResponse.redirect(new URL("/login", "http://localhost:3000"))

  // Clear Supabase auth cookies
  response.cookies.set("sb-access-token", "", { path: "/", expires: new Date(0) })
  response.cookies.set("sb-refresh-token", "", { path: "/", expires: new Date(0) })

  return response
}

export async function POST() {
  return GET()
}