require("dotenv").config({ path: "C:/dev/justdefenders/.env" });

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// --------------------------------------------------

async function getSuppliersMap() {
  const { data } = await supabase.from("suppliers").select("id, name");
  const map = {};
  data.forEach(s => map[s.name.toLowerCase()] = s.id);
  return map;
}

// --------------------------------------------------

async function savePart(part, suppliersMap) {
  const supplierId = suppliersMap[part.supplier.toLowerCase()];

  if (!supplierId || !part.price) {
    console.log("⚠ Skipping invalid part:", part);
    return;
  }

  // 🔹 Insert part
  const { data: inserted, error } = await supabase
    .from("parts")
    .insert([{
      supplier_id: supplierId,
      name: part.partNumber,
      category: part.description,
      price: part.price
    }])
    .select()
    .single();

  if (error) {
    console.log("DB ERROR:", error.message);
    return;
  }

  // 🔹 Insert price history
  await supabase.from("part_prices").insert([{
    part_id: inserted.id,
    price: part.price,
    created_at: new Date().toISOString()
  }]);

}

// --------------------------------------------------

async function runHarvester() {
  const suppliersMap = await getSuppliersMap();

  const parts = [
    {
      supplier: "Rovacraft",
      partNumber: "Starter Motor",
      description: "Electrical",
      price: 320 + Math.floor(Math.random() * 40 - 20)
    },
    {
      supplier: "Karcraft",
      partNumber: "Fuel Pump",
      description: "Fuel System",
      price: 210 + Math.floor(Math.random() * 30 - 15)
    }
  ];

  for (const p of parts) {
    await savePart(p, suppliersMap);
  }

  console.log("✅ Harvest complete (price history updated)");
}

runHarvester();
