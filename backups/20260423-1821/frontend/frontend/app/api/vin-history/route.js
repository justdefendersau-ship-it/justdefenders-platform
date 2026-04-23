import { createClient } from '@supabase/supabase-js';

export async function POST(request) {

  try {

    const body = await request.json();
    const vin = body?.vin;

    if (!vin) {
      return new Response(JSON.stringify({ data: [] }), { status: 200 });
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabase
      .from('vin_history')
      .select('vin,fault,created_at')
      .eq('vin', vin)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error("VIN API error:", error.message);
      return new Response(JSON.stringify({ data: [] }), { status: 200 });
    }

    return new Response(JSON.stringify({ data: data || [] }), { status: 200 });

  } catch (err) {
    console.error("VIN API crash:", err.message);
    return new Response(JSON.stringify({ data: [] }), { status: 200 });
  }
}
