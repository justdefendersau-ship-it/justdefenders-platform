 =====================================================
 JustDefenders ©
 File libdataorg.ts
 Purpose Organisation data access
 =====================================================

import { createClient } from @libsupabaseClient;

export async function getUserOrganisation(userId string) {
  const supabase = createClient();

  const { data } = await supabase
    .from(organisation_members)
    .select(organisation_id)
    .eq(user_id, userId)
    .single();

  return data.organisation_id  null;
}

export async function getOrganisationVehicles(orgId string) {
  const supabase = createClient();

  const { data } = await supabase
    .from(vehicles)
    .select()
    .eq(organisation_id, orgId);

  return data  [];
}