/* mandi-prices.js */
// =========================================
// KrushiMitra - Mandi Prices Page Logic
// =========================================

let mandiData = [];

document.addEventListener('DOMContentLoaded', initMandiPage);

async function initMandiPage() {
  showLoader('priceSpinner');
  await loadMandiPrices();
  hideLoader('priceSpinner');
}

// --------------------
// Load Mandi Prices
// --------------------
async function loadMandiPrices() {
  const container = document.getElementById('mandiPricesContainer');
  if (!container) return;

  try {
    const { ok, data, error } = await authFetch(`${BASE_URL}/api/mandi`);
    if (ok && Array.isArray(data) && data.length > 0) {
      mandiData = data;
    } else if (ok && data?.prices?.length) {
      mandiData = data.prices;
    } else {
      console.warn("⚠️ Using fallback mock data:", error || "No API data");
      mandiData = getMockMandiData();
    }
  } catch (err) {
    console.error("❌ Error loading mandi prices:", err);
    mandiData = getMockMandiData();
  }

  renderMandi(mandiData);
}

// --------------------
// Render Cards
// --------------------
function renderMandi(list) {
  const container = document.getElementById('mandiPricesContainer');
  if (!container) return;

  if (!list.length) {
    container.innerHTML = '<p>No mandi prices available.</p>';
    return;
  }

  container.innerHTML = list.map(p => `
    <div class="price-card card">
      <h3>${p.crop}</h3>
      <p><small>${p.market}</small></p>
      <p class="price">₹${p.price} ${p.unit || ''}</p>
      <p class="price-change ${p.positive ? 'positive' : 'negative'}">${p.change}</p>
      <div class="actions">
        <button class="btn btn-small" onclick="readPriceAloud('${p.crop}', ${p.price}, '${p.market}')">🔊 Read</button>
      </div>
    </div>
  `).join('');
}

// --------------------
// Fallback Mock Data
// --------------------
function getMockMandiData() {
  return [
    { crop: 'Wheat', market: 'Delhi', price: 2350, unit: '₹/qtl', change: '+5%', positive: true },
    { crop: 'Rice', market: 'Mumbai', price: 1850, unit: '₹/qtl', change: '+2%', positive: true },
    { crop: 'Tomato', market: 'Bangalore', price: 35, unit: '₹/kg', change: '+8%', positive: true }
  ];
}

// --------------------
// Voice Feature
// --------------------
function readPriceAloud(crop, price, market) {
  const msg = new SpeechSynthesisUtterance(`The current price of ${crop} in ${market} is ${price} rupees`);
  window.speechSynthesis.speak(msg);
}
