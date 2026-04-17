// env.ts
// Timestamp: 11 March 2026 09:50
// Commentary:
// Central environment configuration for JustDefenders platform.

export const ENV = {

 NODE_ENV: process.env.NODE_ENV || "development",

 API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",

 APP_NAME: "JustDefenders",

}