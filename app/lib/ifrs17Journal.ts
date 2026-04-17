/*
=====================================================
IFRS17 JOURNAL AUTOMATION ENGINE
=====================================================
*/

import { createClient } from "@supabase/supabase-js"
import { calculateCSM } from "@/lib/ifrs17"

export async function generateIFRS17Journal(
  organizationId: string,
  contractId: string,
  premium: number,
  expectedClaims: number,
  riskAdjustment: number,
  discountRate: number,
  years: number
) {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const csm = calculateCSM(
    expectedClaims,
    riskAdjustment,
    premium,
    discountRate,
    years
  )

  await supabase.from("ifrs17_journal_entries").insert([
    {
      organization_id: organizationId,
      contract_id: contractId,
      journal_type: "initial_recognition",
      debit_account: "Insurance Contract Asset",
      credit_account: "CSM Liability",
      amount: csm
    }
  ])
}