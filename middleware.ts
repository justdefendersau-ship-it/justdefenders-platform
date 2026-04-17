// JustDefenders ©
// File: C:\dev\justdefenders\middleware.ts
// Timestamp: 12 April 2026 18:25
// Purpose: Safe auth guard WITHOUT breaking JS or Next internals

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ NEVER touch these (prevents breaking JS)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // Example: protect dashboard (optional later)
  // if (!isLoggedIn && pathname.startsWith('/dashboard')) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  return NextResponse.next();
}