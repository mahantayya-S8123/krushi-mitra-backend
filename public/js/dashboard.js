/* dashboard.js */
document.addEventListener('DOMContentLoaded', initDashboard);

async function initDashboard() {
  const user = getCurrentUser();
  if (!user) return window.location.href = 'index.html';

  // show greeting
  const greet = getTimeBasedGreeting();
  const welcomeEl = document.getElementById('welcomeMessage');
  if (welcomeEl) welcomeEl.textContent = `${greet}, ${user.name || 'Farmer'}! 👋`;

  // try to fetch live stats
  const statsContainer = document.getElementById('quickStats');
  let stats = [];
  const res = await authFetch(`${BASE_URL}/api/dashboard/stats`, { method: 'GET' });
  if (res.ok && res.data) {
    stats = res.data.stats || [
      { icon: '📊', value: res.data.livePrices || '—', label: 'Live Prices' },
      { icon: '🌤️', value: res.data.weatherTemp || '—', label: 'Weather' }
    ];
  } else {
    // fallback mock
    stats = [
      { icon: '📊', value: '156', label: 'Live Prices' },
      { icon: '🌤️', value: '28°C', label: 'Weather' },
      { icon: '🌾', value: '45', label: 'Planting Days' }
    ];
  }

  if (statsContainer) {
    statsContainer.innerHTML = stats.map(s => `
      <div class="stat-card card">
        <div class="stat-icon">${s.icon}</div>
        <div class="stat-value">${s.value}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `).join('');
  }

  // recent activity (try API else mock)
  const actRes = await authFetch(`${BASE_URL}/api/users/activity`, { method: 'GET' });
  const activities = (actRes.ok && actRes.data && actRes.data.activities) ? actRes.data.activities : [
    { icon: '📊', text: 'Checked wheat prices in Delhi', time: '2 hours ago' },
    { icon: '🌱', text: 'Read farming tips', time: '1 day ago' }
  ];
  const activityContainer = document.getElementById('recentActivity');
  if (activityContainer) {
    activityContainer.innerHTML = activities.map(a=>`
      <div class="activity-item">
        <div class="activity-icon">${a.icon}</div>
        <div class="activity-details">
          <p class="activity-text">${a.text}</p>
          <small class="activity-time">${a.time}</small>
        </div>
      </div>
    `).join('');
  }
}

/* simple time greeting helper */
function getTimeBasedGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return translations[currentLanguage]?.goodMorning || 'Good morning';
  if (hour < 17) return translations[currentLanguage]?.goodAfternoon || 'Good afternoon';
  return translations[currentLanguage]?.goodEvening || 'Good evening';
}
