// Timestamp 6 March 2026 20:50
// File: /lib/vin-validator.ts

/*
VIN Validation Utility
Validates structure of VIN numbers.
*/

export function validateVIN(vin: string) {

 if (!vin) return false

 if (vin.length !== 17) return false

 const invalidChars = ["I","O","Q"]

 for (const c of invalidChars) {

   if (vin.includes(c)) return false

 }

 return true

}