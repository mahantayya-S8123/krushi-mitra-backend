// ========================================
// KrushiMitra - Mandi Prices Logic
// ========================================

// Mock data for mandi prices
const mandiPrices = [
    { crop: 'Wheat', market: 'Delhi', price: 2350, unit: 'quintal', change: '+5%', positive: true },
    { crop: 'Rice', market: 'Mumbai', price: 1850, unit: 'quintal', change: '+2%', positive: true },
    { crop: 'Cotton', market: 'Ahmedabad', price: 7200, unit: 'quintal', change: '-3%', positive: false },
    { crop: 'Tomato', market: 'Bangalore', price: 35, unit: 'kg', change: '+8%', positive: true },
    { crop: 'Potato', market: 'Pune', price: 25, unit: 'kg', change: '-5%', positive: false },
    { crop: 'Onion', market: 'Nashik', price: 28, unit: 'kg', change: '+12%', positive: true },
    { crop: 'Sugarcane', market: 'Kolhapur', price: 285, unit: 'quintal', change: '+3%', positive: true },
    { crop: 'Soybean', market: 'Indore', price: 4500, unit: 'quintal', change: '-2%', positive: false }
];

let filteredPrices = [...mandiPrices];

document.addEventListener('DOMContentLoaded', function() {
    initMandiPrices();
});

function initMandiPrices() {
    // Check if user is logged in
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'index.html';
        return;
    }
    
    displayUserInfo(user);
    loadPrices();
    setupFilters();
}

function displayUserInfo(user) {
    const userNameElements = document.querySelectorAll('.user-name');
    userNameElements.forEach(el => {
        if (el) el.textContent = user.name;
    });
}

function loadPrices() {
    const pricesContainer = document.getElementById('pricesContainer');
    if (!pricesContainer) return;
    
    pricesContainer.innerHTML = filteredPrices.map(price => `
        <tr>
            <td><strong>${price.crop}</strong></td>
            <td>${price.market}</td>
            <td>₹${price.price}/${price.unit}</td>
            <td class="price-change ${price.positive ? 'positive' : 'negative'}">
                <strong>${price.change}</strong>
            </td>
            <td>
                <button onclick="readPriceAloud('${price.crop}', ${price.price}, '${price.market}')" 
                        class="btn btn-small">
                    🔊 Read
                </button>
            </td>
        </tr>
    `).join('');
}

function setupFilters() {
    const searchInput = document.getElementById('searchInput');
    const marketFilter = document.getElementById('marketFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterPrices);
    }
    
    if (marketFilter) {
        marketFilter.addEventListener('change', filterPrices);
    }
}

function filterPrices() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const selectedMarket = document.getElementById('marketFilter')?.value || '';
    
    filteredPrices = mandiPrices.filter(price => {
        const matchesSearch = price.crop.toLowerCase().includes(searchTerm);
        const matchesMarket = !selectedMarket || price.market === selectedMarket;
        return matchesSearch && matchesMarket;
    });
    
    loadPrices();
}

function readPriceAloud(crop, price, market) {
    const text = `${crop} price in ${market} is rupees ${price} per quintal`;
    speak(text);
}

function readAllPrices() {
    if (filteredPrices.length === 0) {
        speak('No prices to read');
        return;
    }
    
    let text = 'Current market prices: ';
    filteredPrices.forEach((price, index) => {
        text += `${price.crop} in ${price.market} is rupees ${price.price}. `;
        if (index < filteredPrices.length - 1) {
            text += 'Next, ';
        }
    });
    
    speak(text);
}