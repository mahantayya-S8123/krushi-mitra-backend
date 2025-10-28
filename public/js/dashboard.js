// ========================================
// KrushiMitra - Dashboard Logic
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initDashboard();
});

function initDashboard() {
    // Check if user is logged in
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'index.html';
        return;
    }
    
    // Display user info
    displayUserInfo(user);
    
    // Load dashboard data
    loadStats();
    loadRecentActivity();
    loadPriceAlerts();
    
    // Speak welcome message
    const greeting = getTimeBasedGreeting();
    speak(`${greeting} ${user.name}! Welcome to KrushiMitra`);
}

function displayUserInfo(user) {
    // Update user name in header
    const userNameElements = document.querySelectorAll('.user-name');
    userNameElements.forEach(el => {
        if (el) el.textContent = user.name;
    });
    
    // Update welcome message
    const greeting = getTimeBasedGreeting();
    const welcomeElement = document.getElementById('welcomeMessage');
    if (welcomeElement) {
        welcomeElement.textContent = `${greeting}, ${user.name}! 👋`;
    }
}

function loadStats() {
    const stats = [
        { icon: '📊', value: '156', label: 'Live Prices', id: 'stat-prices' },
        { icon: '🌤️', value: '28°C', label: 'Weather', id: 'stat-weather' },
        { icon: '🌾', value: '45', label: 'Planting Days', id: 'stat-planting' },
        { icon: '💰', value: '₹2,350', label: 'Best Price', id: 'stat-best-price' }
    ];
    
    const statsContainer = document.getElementById('statsContainer');
    if (statsContainer) {
        statsContainer.innerHTML = stats.map(stat => `
            <div class="stat-card">
                <div class="stat-icon">${stat.icon}</div>
                <div class="stat-value">${stat.value}</div>
                <div class="stat-label">${stat.label}</div>
            </div>
        `).join('');
    }
}

function loadRecentActivity() {
    const activities = [
        { icon: '📊', text: 'Checked wheat prices in Delhi', time: '2 hours ago' },
        { icon: '🛒', text: 'Added fertilizer to cart', time: '1 day ago' },
        { icon: '🚜', text: 'Booked tractor service', time: '2 days ago' },
        { icon: '🌱', text: 'Read farming tips', time: '3 days ago' }
    ];
    
    const activityContainer = document.getElementById('recentActivity');
    if (activityContainer) {
        activityContainer.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <span class="activity-icon">${activity.icon}</span>
                <div class="activity-details">
                    <p class="activity-text">${activity.text}</p>
                    <small class="activity-time">${activity.time}</small>
                </div>
            </div>
        `).join('');
    }
}

function loadPriceAlerts() {
    const alerts = [
        { crop: 'Wheat', market: 'Delhi', price: '₹2,350/qtl', change: '+5%', positive: true },
        { crop: 'Rice', market: 'Mumbai', price: '₹1,850/qtl', change: '+2%', positive: true },
        { crop: 'Cotton', market: 'Ahmedabad', price: '₹7,200/qtl', change: '-3%', positive: false }
    ];
    
    const alertsContainer = document.getElementById('priceAlerts');
    if (alertsContainer) {
        alertsContainer.innerHTML = alerts.map(alert => `
            <div class="price-alert-item">
                <div class="price-info">
                    <strong>${alert.crop}</strong>
                    <small>${alert.market}</small>
                    <span class="price">${alert.price}</span>
                </div>
                <div class="price-change ${alert.positive ? 'positive' : 'negative'}">
                    ${alert.change}
                </div>
            </div>
        `).join('');
    }
}

// Quick actions
function goToMandiPrices() {
    window.location.href = 'mandi-prices.html';
}

function goToMarketplace() {
    window.location.href = 'marketplace.html';
}

function goToServices() {
    window.location.href = 'services.html';
}

function goToAdvisory() {
    window.location.href = 'advisory.html';
}