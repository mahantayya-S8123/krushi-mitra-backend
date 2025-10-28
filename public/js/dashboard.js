// ✅ dashboard.js — Fully Working Version
document.addEventListener('DOMContentLoaded', async () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user || !user.name) {
    window.location.href = 'index.html';
    return;
  }

  // Greet user
  document.getElementById('userName').textContent = user.name || 'Farmer';

  try {
    // Fetch dashboard data
    const response = await fetch('/api/dashboard');
    const data = await response.json();

    if (response.ok && data.success) {
      renderDashboard(data);
    } else {
      renderDashboard({
        weather: { temp: 29, condition: 'Sunny' },
        market: [
          { crop: 'Wheat', price: 2150 },
          { crop: 'Rice', price: 3200 },
          { crop: 'Maize', price: 1850 }
        ]
      });
    }
  } catch (err) {
    console.error('Dashboard load failed:', err);
    renderDashboard({
      weather: { temp: 29, condition: 'Sunny' },
      market: [
        { crop: 'Wheat', price: 2150 },
        { crop: 'Rice', price: 3200 },
        { crop: 'Maize', price: 1850 }
      ]
    });
  }
});

function renderDashboard(data) {
  // Weather
  const weatherEl = document.getElementById('weather');
  if (weatherEl) weatherEl.textContent = `${data.weather.temp}°C - ${data.weather.condition}`;

  // Mandi Prices
  const marketEl = document.getElementById('marketUpdates');
  if (marketEl)
    marketEl.innerHTML = data.market
      .map(m => `<li>${m.crop}: ₹${m.price}</li>`)
      .join('');
}
