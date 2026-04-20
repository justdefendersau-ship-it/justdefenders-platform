require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());

const PORT = 4000;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// ==================================================
// SCORING
// ==================================================

function getTierScore(tier) {
  if (!tier) return 50;
  const t = tier.toLowerCase();
  if (t === 'gold') return 300;
  if (t === 'silver') return 200;
  if (t === 'bronze') return 100;
  return 50;
}

function calculateScore(p) {
  let score = 0;

  const price = Number(p.price) || 9999;
  score += (1000 - price);

  const rating = Number(p.suppliers?.rating) || 0;
  score += rating * 100;

  score += getTierScore(p.suppliers?.tier);

  if (p.suppliers?.is_authorised) {
    score += 200;
  }

  return Math.round(score);
}

// ==================================================
// PRICE INSIGHT (HISTORY)
// ==================================================

function getPriceInsight(prices) {
  if (!prices || prices.length < 2) return "No history";

  const sorted = prices.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );

  const first = Number(sorted[0].price);
  const last = Number(sorted[sorted.length - 1].price);

  const change = last - first;

  if (change < -20) return "Price dropping";
  if (change > 20) return "Price rising";
  return "Stable price";
}

// ==================================================
// PREDICTIVE PRICING
// ==================================================

function getPrediction(prices) {
  if (!prices || prices.length < 3) return "Not enough data";

  const sorted = prices.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );

  const first = Number(sorted[0].price);
  const last = Number(sorted[sorted.length - 1].price);

  const trend = last - first;

  const avg =
    sorted.reduce((sum, p) => sum + Number(p.price), 0) / sorted.length;

  if (trend < -10) {
    return "Falling — wait";
  }

  if (trend > 10) {
    return "Rising — buy now";
  }

  if (last < avg) {
    return "Good price vs average";
  }

  return "Stable pricing";
}

// ==================================================
// API
// ==================================================

app.get('/api/parts', async (req, res) => {
  const query = req.query.q || '';

  try {
    const { data, error } = await supabase
      .from('parts')
      .select(
        id,
        name,
        category,
        price,
        supplier_id,
        part_prices (
          price,
          created_at
        ),
        suppliers (
          id,
          name,
          website,
          purchase_url,
          rating,
          tier,
          is_authorised
        )
      )
      .or('name.ilike.%' + query + '%,category.ilike.%' + query + '%')
      .limit(50);

    if (error) {
      console.log('DB ERROR:', error.message);
      return res.json({ results: [] });
    }

    const mapped = data.map(p => {
      const score = calculateScore(p);

      return {
        supplier: p.suppliers?.name || ('Supplier ' + p.supplier_id),
        partNumber: p.name,
        description: p.category || '',
        price: Number(p.price) || 0,
        rating: Number(p.suppliers?.rating) || 0,
        tier: p.suppliers?.tier || 'unknown',
        authorised: p.suppliers?.is_authorised || false,
        score: score,

        priceInsight: getPriceInsight(p.part_prices),
        prediction: getPrediction(p.part_prices),

        url:
          p.suppliers?.purchase_url ||
          p.suppliers?.website ||
          'https://www.google.com/search?q=' + encodeURIComponent(p.name),

        stock: 'unknown'
      };
    });

    mapped.sort((a, b) => b.score - a.score);

    if (mapped.length > 0) {
      mapped[0].best = true;
    }

    res.json({ results: mapped });

  } catch (err) {
    console.log('API ERROR:', err.message);
    res.json({ results: [] });
  }
});

// ==================================================

app.listen(PORT, () => {
  console.log('API running (PREDICTIVE PRICING ACTIVE) on port ' + PORT);
});
