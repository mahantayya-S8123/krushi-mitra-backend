/* mandi-prices.js */
let mandiData = [];

document.addEventListener('DOMContentLoaded', loadMandiPrices);

async function loadMandiPrices() {
  const container = document.getElementById('mandiPricesContainer');
  if (!container) return;

  // Try API
  const res = await authFetch(`${BASE_URL}/api/prices`, { method: 'GET' });
  if (res.ok && Array.isArray(res.data)) {
    mandiData = res.data;
  } else if (res.ok && res.data.prices) {
    mandiData = res.data.prices;
  } else {
    // fallback mock
    mandiData = [
      { crop: 'Wheat', market: 'Delhi', price: 2350, unit: '₹/qtl', change: '+5%', positive: true },
      { crop: 'Rice', market: 'Mumbai', price: 1850, unit: '₹/qtl', change: '+2%', positive: true },
      { crop: 'Tomato', market: 'Bangalore', price: 35, unit: '₹/kg', change: '+8%', positive: true }
    ];
  }
  renderMandi(mandiData);
}

function renderMandi(list) {
  const container = document.getElementById('mandiPricesContainer');
  if (!container) return;
  if (list.length === 0) container.innerHTML = '<p>No prices available</p>';
  container.innerHTML = list.map(p => `
    <div class="card">
      <h3>${p.crop}</h3>
      <p><small>${p.market}</small></p>
      <p class="price">${p.price} ${p.unit}</p>
      <p class="price-change ${p.positive ? 'positive' : 'negative'}">${p.change}</p>
      <div style="margin-top:10px;">
        <button class="btn btn-small" onclick="readPriceAloud('${p.crop}', ${p.price}, '${p.market}')">🔊 Read</button>
      </div>
    </div>
  `).join('');
}

function filterMandiPrices() {
  const q = (document.getElementById('mandiSearch')?.value || '').toLowerCase();
  const filtered = mandiData.filter(p => p.crop.toLowerCase().includes(q) || p.market.toLowerCase().includes(q));
  renderMandi(filtered);
}

function readPriceAloud(crop, price, market) {
  speak(`${crop} price in ${market} is rupees ${price}`);
}

/* read all with stop support */
let readingUtter = null;
function readAllPrices() {
  if (!mandiData || mandiData.length === 0) return speak('No prices to read');
  const text = mandiData.map(p => `${p.crop} in ${p.market} is ${p.price} rupees`).join('. Next, ');
  speak(text);
}
function stopReading() { speechSynthesis?.cancel(); }

window.filterMandiPrices = filterMandiPrices;
window.readPriceAloud = readPriceAloud;
window.readAllPrices = readAllPrices;
window.stopReading = stopReading;
