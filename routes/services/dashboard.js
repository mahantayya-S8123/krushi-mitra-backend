// ========================================
// KrushiMitra - Dashboard Logic
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initDashboard();
});

// Initialize dashboard
function initDashboard() {
    // Load user data
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (user) {
        updateWelcomeMessage(user);
        loadRecentActivity();
        loadStatistics();
    }
}

// Update welcome message
function updateWelcomeMessage(user) {
    const welcomeMsg = document.getElementById('welcomeMessage');
    const userGreeting = document.getElementById('userGreeting');
    
    if (welcomeMsg && userGreeting) {
        const greeting = getGreeting();
        const userName = user.name || 'Farmer';
        
        welcomeMsg.textContent = `${greeting}, ${userName}! 👋`;
        userGreeting.textContent = 'Ready to help with your farming needs today.';
        
        // Speak welcome message if voice is enabled
        if (isVoiceEnabled) {
            setTimeout(() => {
                speakText(`${greeting} ${userName}! Welcome to KrushiMitra.`, currentLanguage);
            }, 500);
        }
    }
}

// Load statistics
function loadStatistics() {
    // Simulate loading statistics
    const statPricesCount = document.getElementById('statPricesCount');
    const statWeatherTemp = document.getElementById('statWeatherTemp');
    const statPlantingCount = document.getElementById('statPlantingCount');
    
    if (statPricesCount) statPricesCount.textContent = '12 crops updated today';
    if (statWeatherTemp) statWeatherTemp.textContent = '28°C • Partly Cloudy';
    if (statPlantingCount) statPlantingCount.textContent = '15 days left for Rabi season';
}

// Load recent activity
function loadRecentActivity() {
    const activityContainer = document.getElementById('recentActivity');
    
    if (activityContainer) {
        const activities = [
            { icon: '💰', text: 'Checked mandi prices for Wheat', time: '2 hours ago' },
            { icon: '🛒', text: 'Added fertilizer to cart', time: '5 hours ago' },
            { icon: '🌱', text: 'Read farming advisory on Rice', time: '1 day ago' }
        ];
        
        activityContainer.innerHTML = activities.map(activity => `
            <div class="activity-item" style="padding: 1rem; border-left: 3px solid var(--primary-green); margin-bottom: 1rem; background: var(--light-green);">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <span style="font-size: 1.5rem;">${activity.icon}</span>
                    <div>
                        <p style="margin: 0; font-weight: 500;">${activity.text}</p>
                        <p style="margin: 0; font-size: 0.875rem; color: var(--gray);">${activity.time}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Update todos
todo_write
