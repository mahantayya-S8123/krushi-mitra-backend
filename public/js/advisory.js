// ========================================
// KrushiMitra - Advisory Logic
// ========================================

let adviceData = [];

document.addEventListener('DOMContentLoaded', function() {
    initAdvisory();
});

// Initialize advisory
function initAdvisory() {
    loadWeather();
    loadAdvice();
    loadCropCalendar();
    loadSchemes();
    loadExperts();
}

// Load weather information
function loadWeather() {
    const container = document.getElementById('weatherInfo');
    
    if (container) {
        container.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                <div style="padding: 1rem; background: linear-gradient(135deg, #4CAF50, #2E8B57); color: white; border-radius: var(--border-radius);">
                    <h3 style="margin-bottom: 0.5rem;">🌤️ Today</h3>
                    <p style="font-size: 2rem; margin: 0.5rem 0;">28°C</p>
                    <p style="margin: 0;">Partly Cloudy</p>
                </div>
                <div style="padding: 1rem; background: #2196F3; color: white; border-radius: var(--border-radius);">
                    <h3 style="margin-bottom: 0.5rem;">🌧️ Tomorrow</h3>
                    <p style="font-size: 2rem; margin: 0.5rem 0;">26°C</p>
                    <p style="margin: 0;">Light Rain Expected</p>
                </div>
                <div style="padding: 1rem; background: #FF9800; color: white; border-radius: var(--border-radius);">
                    <h3 style="margin-bottom: 0.5rem;">📊 This Week</h3>
                    <p style="font-size: 2rem; margin: 0.5rem 0;">24-30°C</p>
                    <p style="margin: 0;">Mixed Weather</p>
                </div>
            </div>
            <div style="margin-top: 1rem; padding: 1rem; background: var(--light-green); border-radius: var(--border-radius);">
                <p><strong>💡 Advisory:</strong> Light rain expected tomorrow. Avoid spraying pesticides today.</p>
            </div>
        `;
    }
}

// Load advice data
function loadAdvice() {
    adviceData = [
        { id: 1, title: 'Optimal Time for Sowing Wheat', category: 'seasonal', content: 'Sow wheat between November 15-30 for best results. Prepare soil with proper irrigation.', icon: '🌾' },
        { id: 2, title: 'Control Aphids Naturally', category: 'pest', content: 'Mix neem oil with water and spray on affected plants. Use ladybugs as natural predators.', icon: '🐛' },
        { id: 3, title: 'Proper Fertilizer Application', category: 'fertilizer', content: 'Apply fertilizers in morning hours. Mix with soil and water immediately after application.', icon: '🌿' },
        { id: 4, title: 'Water Management in Summer', category: 'water', content: 'Water crops early morning or late evening. Use drip irrigation to save water.', icon: '💧' },
        { id: 5, title: 'Rice Planting Season', category: 'seasonal', content: 'Transplant rice seedlings in June-July. Maintain proper water level in fields.', icon: '🌾' },
        { id: 6, title: 'Compost Making', category: 'fertilizer', content: 'Mix kitchen waste with dry leaves. Turn every week for better decomposition.', icon: '🌿' }
    ];
    
    renderAdvice();
}

// Render advice
function renderAdvice() {
    const container = document.getElementById('adviceContainer');
    
    if (container) {
        container.innerHTML = adviceData.map(advice => `
            <div class="item-card" style="margin-bottom: 1rem;">
                <div style="display: flex; align-items: start; gap: 1rem;">
                    <span style="font-size: 3rem;">${advice.icon}</span>
                    <div style="flex: 1;">
                        <h3 style="margin-bottom: 0.5rem;">${advice.title}</h3>
                        <p style="margin: 0; color: var(--gray);">${advice.content}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Filter by search
function filterAdvice() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const container = document.getElementById('adviceContainer');
    
    if (container) {
        const filtered = adviceData.filter(advice => {
            return advice.title.toLowerCase().includes(searchTerm) ||
                   advice.content.toLowerCase().includes(searchTerm);
        });
        
        container.innerHTML = filtered.map(advice => `
            <div class="item-card" style="margin-bottom: 1rem;">
                <div style="display: flex; align-items: start; gap: 1rem;">
                    <span style="font-size: 3rem;">${advice.icon}</span>
                    <div style="flex: 1;">
                        <h3 style="margin-bottom: 0.5rem;">${advice.title}</h3>
                        <p style="margin: 0; color: var(--gray);">${advice.content}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Filter by category
function filterByCategory(category) {
    activeCategory = category;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const container = document.getElementById('adviceContainer');
    if (!container) return;
    
    const filtered = category === 'all' ? adviceData : adviceData.filter(a => a.category === category);
    
    container.innerHTML = filtered.map(advice => `
        <div class="item-card" style="margin-bottom: 1rem;">
            <div style="display: flex; align-items: start; gap: 1rem;">
                <span style="font-size: 3rem;">${advice.icon}</span>
                <div style="flex: 1;">
                    <h3 style="margin-bottom: 0.5rem;">${advice.title}</h3>
                    <p style="margin: 0; color: var(--gray);">${advice.content}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Load crop calendar
function loadCropCalendar() {
    const container = document.getElementById('cropCalendar');
    
    if (container) {
        container.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                <div style="padding: 1rem; background: var(--white); border: 2px solid var(--primary-green); border-radius: var(--border-radius);">
                    <h3 style="margin-bottom: 0.5rem; color: var(--primary-green);">🌾 Wheat</h3>
                    <p style="margin: 0; font-size: 0.875rem;">Sowing: Nov-Dec</p>
                    <p style="margin: 0; font-size: 0.875rem;">Harvest: Mar-Apr</p>
                </div>
                <div style="padding: 1rem; background: var(--white); border: 2px solid var(--primary-green); border-radius: var(--border-radius);">
                    <h3 style="margin-bottom: 0.5rem; color: var(--primary-green);">🌾 Rice</h3>
                    <p style="margin: 0; font-size: 0.875rem;">Sowing: Jun-Jul</p>
                    <p style="margin: 0; font-size: 0.875rem;">Harvest: Oct-Nov</p>
                </div>
                <div style="padding: 1rem; background: var(--white); border: 2px solid var(--primary-green); border-radius: var(--border-radius);">
                    <h3 style="margin-bottom: 0.5rem; color: var(--primary-green);">🥔 Potato</h3>
                    <p style="margin: 0; font-size: 0.875rem;">Sowing: Jan-Feb</p>
                    <p style="margin: 0; font-size: 0.875rem;">Harvest: Apr-May</p>
                </div>
                <div style="padding: 1rem; background: var(--white); border: 2px solid var(--primary-green); border-radius: var(--border-radius);">
                    <h3 style="margin-bottom: 0.5rem; color: var(--primary-green);">🫘 Pulses</h3>
                    <p style="margin: 0; font-size: 0.875rem;">Sowing: Jun-Jul</p>
                    <p style="margin: 0; font-size: 0.875rem;">Harvest: Oct-Nov</p>
                </div>
            </div>
        `;
    }
}

// Load schemes information
function loadSchemes() {
    const container = document.getElementById('schemesInfo');
    
    if (container) {
        container.innerHTML = `
            <div class="item-card" style="margin-bottom: 1rem;">
                <h3 style="margin-bottom: 0.5rem;">💳 PM Kisan Scheme</h3>
                <p style="margin: 0; color: var(--gray);">Direct income support of ₹6,000 per year to farmers</p>
            </div>
            <div class="item-card" style="margin-bottom: 1rem;">
                <h3 style="margin-bottom: 0.5rem;">🌾 Pradhan Mantri Fasal Bima Yojana</h3>
                <p style="margin: 0; color: var(--gray);">Crop insurance against natural disasters</p>
            </div>
            <div class="item-card" style="margin-bottom: 1rem;">
                <h3 style="margin-bottom: 0.5rem;">💧 Micro Irrigation Scheme</h3>
                <p style="margin: 0; color: var(--gray);">Subsidies for drip and sprinkler irrigation systems</p>
            </div>
        `;
    }
}

// Load experts information
function loadExperts() {
    const container = document.getElementById('expertInfo');
    
    if (container) {
        container.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                <div class="item-card">
                    <h3 style="margin-bottom: 0.5rem;">👨‍🌾 Dr. Rajesh Kumar</h3>
                    <p style="margin: 0; color: var(--gray);">Agricultural Specialist</p>
                    <p style="margin: 0; color: var(--gray);">⭐ 4.8 | 500+ Consultations</p>
                </div>
                <div class="item-card">
                    <h3 style="margin-bottom: 0.5rem;">👩‍🌾 Dr. Priya Sharma</h3>
                    <p style="margin: 0; color: var(--gray);">Crop Expert</p>
                    <p style="margin: 0; color: var(--gray);">⭐ 4.9 | 300+ Consultations</p>
                </div>
                <div class="item-card">
                    <h3 style="margin-bottom: 0.5rem;">👨‍🌾 Dr. Amit Verma</h3>
                    <p style="margin: 0; color: var(--gray);">Soil Scientist</p>
                    <p style="margin: 0; color: var(--gray);">⭐ 4.7 | 450+ Consultations</p>
                </div>
            </div>
        `;
    }
}

// Open expert booking
function openExpertBooking() {
    showModal('expertModal');
}

// Close expert modal
function closeExpertModal() {
    closeModal('expertModal');
    document.getElementById('expertBookingForm').reset();
}

// Handle expert booking
document.getElementById('expertBookingForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const expert = document.getElementById('expertSelect').value;
    const date = document.getElementById('expertDate').value;
    const time = document.getElementById('expertTime').value;
    const query = document.getElementById('expertQuery').value;
    
    showSuccess('Expert consultation booked successfully!');
    closeExpertModal();
});

// Export functions
window.filterAdvice = filterAdvice;
window.filterByCategory = filterByCategory;
window.openExpertBooking = openExpertBooking;
window.closeExpertModal = closeExpertModal;

