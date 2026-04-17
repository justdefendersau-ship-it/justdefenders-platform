// next.config.ts
// Timestamp: 10 March 2026 00:05
// Commentary:
// Optimised Next.js configuration for JustDefenders.
// Limits Turbopack to the platform directory to improve rebuild performance.

import type { NextConfig } from "next"

const nextConfig: NextConfig = {

 turbopack: {
  root: __dirname
 }

}

export default nextConfig