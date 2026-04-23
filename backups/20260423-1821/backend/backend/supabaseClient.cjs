require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;

if (!url || !key) {
  console.log("⚠️ Supabase not configured — running in local mode");
  module.exports = { supabase: null };
} else {
  const supabase = createClient(url, key);
  module.exports = { supabase };
}