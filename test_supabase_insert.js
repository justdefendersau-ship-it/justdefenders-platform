
// ============================================================
// JustDefenders ©
// File: C:\dev\justdefenders\test_supabase_insert.js
// Timestamp: 01-04-2026 10:50 (Sydney)
// Purpose: Direct Supabase insert test (ESM compatible)
// ============================================================

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://mpfvggikijgwmnpmpchm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wZnZnZ2lraWpnd21ucG1wY2htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExOTU3ODMsImV4cCI6MjA4Njc3MTc4M30.aal2_FZb8fPYAoWYzeh2eH23IZlHDRVKEvfCrJy7usM'
);

async function run() {
  console.log("Starting test...");

  const { data, error } = await supabase
    .from('activity_logs')
    .insert({
      user_id: '00000000-0000-0000-0000-000000000001',
      type: 'harvester',
      description: 'DIRECT TEST INSERT',
      date: new Date().toISOString()
    });

  console.log("DATA:", data);
  console.log("ERROR:", error);
}

run();