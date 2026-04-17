/*
=====================================================
SUBSCRIPTION ENFORCEMENT
=====================================================
*/

export function hasAdvancedAccess(tier: string) {
  return tier === "pro" || tier === "enterprise"
}