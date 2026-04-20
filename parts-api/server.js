require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// --------------------------------------------------
// SCORING ENGINE (SAFE)
// --------------------------------------------------

function calculateScore(price, rating, tier, authorised) {
  let score = 0;

  // Price (lower = better)
  score += (1000 - (price || 999));

  // Rating
  score += (Number(rating) || 0) * 100;

  // Tier
  if (tier === 'gold') score += 300;
  else if (tier === 'silver') score += 200;
  else score += 100;

  // Authorised
  if (authorised) score += 200;

  return Math.round(score);
}

// --------------------------------------------------
// SIMPLE PRICE INSIGHT
// --------------------------------------------------

function getInsight(price) {
  if (!price) return "No data";
  if (price < 250) return "Good price";
  if (price > 350) return "Expensive";
  return "Fair price";
}

// --------------------------------------------------
// SIMPLE PREDICTION (SAFE PLACEHOLDER)
// --------------------------------------------------

function getPrediction(price) {
  if (!price) return "Unknown";
  if (price < 300) return "Buy now";
  return "Monitor price";
}

// --------------------------------------------------
// API
// --------------------------------------------------

app.get('/api/parts', async (req, res) => {

  const query = req.query.q || '';

  try {

    // -----------------------------
    // 1. PARTS
    // -----------------------------
    const { data: parts, error: partsError } = await supabase
      .from('parts')
      .select('name, price, supplier_id')
      .ilike('name', '%' + query + '%')
      .limit(20);

    if (partsError) {
      console.log('PARTS ERROR:', partsError.message);
      return res.json({ results: [] });
    }

    // -----------------------------
    // 2. SUPPLIERS
    // -----------------------------
    const { data: suppliers } = await supabase
      .from('suppliers')
      .select('id, name, website, rating, tier, is_authorised');

    const supplierMap = {};
    (suppliers || []).forEach(s => {
      supplierMap[s.id] = s;
    });

    // -----------------------------
    // 3. JOIN + INTELLIGENCE
    // -----------------------------
    let results = (parts || []).map(p => {

      const s = supplierMap[p.supplier_id];

      const price = Number(p.price) || 0;

      const score = calculateScore(
        price,
        s?.rating,
        s?.tier,
        s?.is_authorised
      );

      return {
        supplier: s?.name || "Unknown",
        partNumber: p.name,
        price: price,
        score: score,
        insight: getInsight(price),
        prediction: getPrediction(price),

        url:
          s?.website ||
          'https://www.google.com/search?q=' + encodeURIComponent(p.name)
      };
    });

    // -----------------------------
    // 4. SORT + BEST
    // -----------------------------
    results.sort((a, b) => b.score - a.score);

    if (results.length > 0) {
      results[0].best = true;
    }

    res.json({ results });

  } catch (err) {
    console.log('API ERROR:', err.message);
    res.json({ results: [] });
  }
});

// --------------------------------------------------

app.listen(4000, () => {
  console.log('API running (INTELLIGENCE RESTORED) on port 4000');
});

