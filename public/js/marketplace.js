/**
 * marketplace.js
 * Displays live mandi prices + product listings
 */

const mandiContainer = document.getElementById("mandiPricesContainer");
const searchInput = document.getElementById("mandiSearch");

// === Fetch Mandi Prices ===
async function loadMandiPrices() {
  try {
    mandiContainer.innerHTML = "🔄 Loading latest mandi prices...";
    const res = await fetch("/api/mandi"); // Backend endpoint
    const data = await res.json();

    renderMandiCards(data);
  } catch (err) {
    mandiContainer.innerHTML = "⚠️ Could not fetch mandi prices.";
    console.error(err);
  }
}

// === Render Cards ===
function renderMandiCards(prices) {
  mandiContainer.innerHTML = prices.map(p => `
    <div class="card">
      <h3>${p.crop}</h3>
      <p><b>Market:</b> ${p.market}</p>
      <p><b>Price:</b> ₹${p.price}/quintal</p>
      <p><b>Date:</b> ${new Date(p.date).toLocaleDateString()}</p>
    </div>
  `).join("");
}

// === Search Filter ===
function filterMandiPrices() {
  const term = searchInput.value.toLowerCase();
  const cards = mandiContainer.querySelectorAll(".card");
  cards.forEach(card => {
    card.style.display = card.textContent.toLowerCase().includes(term)
      ? "block"
      : "none";
  });
}

// === Init ===
document.addEventListener("DOMContentLoaded", loadMandiPrices);
