// middleware.ts
// Timestamp: 10 March 2026 16:20
// Commentary:
// Injects the selected country into API requests.

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request:NextRequest){

 const country =
  request.headers.get("x-country") ||
  "AU"

 const response = NextResponse.next()

 response.headers.set("x-country",country)

 return response

}