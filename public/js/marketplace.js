// ========================================
// KrushiMitra - Marketplace Logic
// ========================================

let products = [];
let cart = [];
let activeCategory = 'all';

document.addEventListener('DOMContentLoaded', function() {
    initMarketplace();
});

// Initialize marketplace
function initMarketplace() {
    loadProducts();
    loadCart();
    updateCartCount();
}

// Load products
function loadProducts() {
    // Mock product data
    products = [
        { id: 1, name: 'Wheat Seeds (Premium)', category: 'seeds', price: 45, unit: 'kg', rating: 4.5, icon: '🌾' },
        { id: 2, name: 'Rice Seeds (Basmati)', category: 'seeds', price: 85, unit: 'kg', rating: 4.8, icon: '🌾' },
        { id: 3, name: 'Tomato Seeds (Hybrid)', category: 'seeds', price: 1200, unit: '100g', rating: 4.6, icon: '🍅' },
        { id: 4, name: 'Urea Fertilizer', category: 'fertilizers', price: 15, unit: 'kg', rating: 4.4, icon: '🧪' },
        { id: 5, name: 'DAP Fertilizer', category: 'fertilizers', price: 25, unit: 'kg', rating: 4.7, icon: '🧪' },
        { id: 6, name: 'NPK Fertilizer', category: 'fertilizers', price: 20, unit: 'kg', rating: 4.5, icon: '🧪' },
        { id: 7, name: 'Pesticide Spray', category: 'pesticides', price: 180, unit: '250ml', rating: 4.3, icon: '🧪' },
        { id: 8, name: 'Herbicide', category: 'pesticides', price: 120, unit: '500ml', rating: 4.2, icon: '🧪' },
        { id: 9, name: 'Fungicide', category: 'pesticides', price: 160, unit: '250ml', rating: 4.6, icon: '🧪' },
        { id: 10, name: 'Sprayer (Manual)', category: 'equipment', price: 800, unit: 'piece', rating: 4.4, icon: '🛠️' },
        { id: 11, name: 'Harvesting Sickle', category: 'equipment', price: 150, unit: 'piece', rating: 4.5, icon: '🔨' },
        { id: 12, name: 'Shovel', category: 'equipment', price: 300, unit: 'piece', rating: 4.6, icon: '🛠️' }
    ];
    
    renderProducts();
    loadFeaturedProducts();
}

// Render products
function renderProducts() {
    const container = document.getElementById('productsContainer');
    
    if (container) {
        container.innerHTML = products.map(product => `
            <div class="item-card">
                <div class="item-card-icon" style="font-size: 3rem; text-align: center; margin-bottom: 1rem;">
                    ${product.icon}
                </div>
                <h3 class="item-card-title">${product.name}</h3>
                <p class="item-card-info">
                    ⭐ ${product.rating} | ${formatCurrency(product.price)}/${product.unit}
                </p>
                <div class="item-card-actions">
                    <button class="btn-secondary" onclick="addToCart(${product.id})">
                        🛒 Add to Cart
                    </button>
                    <button class="btn-outline" onclick="buyNow(${product.id})">
                        Buy Now
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// Load featured products
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    
    if (container) {
        const featured = products.slice(0, 3);
        container.innerHTML = featured.map(product => `
            <div class="item-card">
                <div class="item-card-icon" style="font-size: 3rem; text-align: center; margin-bottom: 1rem;">
                    ${product.icon}
                </div>
                <h3 class="item-card-title">${product.name}</h3>
                <p class="item-card-info">
                    ⭐ ${product.rating} | ${formatCurrency(product.price)}/${product.unit}
                </p>
                <button class="btn-secondary" onclick="addToCart(${product.id})" style="width: 100%;">
                    🛒 Add to Cart
                </button>
            </div>
        `).join('');
    }
}

// Filter by search
function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    const container = document.getElementById('productsContainer');
    if (!container) return;
    
    container.innerHTML = products.filter(product => {
        return product.name.toLowerCase().includes(searchTerm);
    }).map(product => `
        <div class="item-card">
            <div class="item-card-icon" style="font-size: 3rem; text-align: center; margin-bottom: 1rem;">
                ${product.icon}
            </div>
            <h3 class="item-card-title">${product.name}</h3>
            <p class="item-card-info">
                ⭐ ${product.rating} | ${formatCurrency(product.price)}/${product.unit}
            </p>
            <div class="item-card-actions">
                <button class="btn-secondary" onclick="addToCart(${product.id})">
                    🛒 Add to Cart
                </button>
                <button class="btn-outline" onclick="buyNow(${product.id})">
                    Buy Now
                </button>
            </div>
        </div>
    `).join('');
}

// Filter by category
function filterByCategory(category) {
    activeCategory = category;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const container = document.getElementById('productsContainer');
    if (!container) return;
    
    const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
    
    container.innerHTML = filteredProducts.map(product => `
        <div class="item-card">
            <div class="item-card-icon" style="font-size: 3rem; text-align: center; margin-bottom: 1rem;">
                ${product.icon}
            </div>
            <h3 class="item-card-title">${product.name}</h3>
            <p class="item-card-info">
                ⭐ ${product.rating} | ${formatCurrency(product.price)}/${product.unit}
            </p>
            <div class="item-card-actions">
                <button class="btn-secondary" onclick="addToCart(${product.id})">
                    🛒 Add to Cart
                </button>
                <button class="btn-outline" onclick="buyNow(${product.id})">
                    Buy Now
                </button>
            </div>
        </div>
    `).join('');
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartCount();
    
    if (isVoiceEnabled) {
        speakText(`Added ${product.name} to cart`, currentLanguage);
    }
    
    showSuccess('Product added to cart!');
}

// Buy now
function buyNow(productId) {
    addToCart(productId);
    showCart();
}

// Load cart from localStorage
function loadCart() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

// Show cart modal
function showCart() {
    renderCartItems();
    updateCartSummary();
    showModal('cartModal');
}

// Close cart modal
function closeCart() {
    closeModal('cartModal');
}

// Render cart items
function renderCartItems() {
    const container = document.getElementById('cartItems');
    
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty</p>';
        return;
    }
    
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>${formatCurrency(item.price)}/${item.unit}</p>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span style="padding: 0 1rem; font-weight: 600;">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="btn-outline" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        updateCartCount();
        renderCartItems();
        updateCartSummary();
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCartItems();
    updateCartSummary();
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;
    
    document.getElementById('cartSubtotal').textContent = formatCurrency(subtotal);
    document.getElementById('cartTax').textContent = formatCurrency(tax);
    document.getElementById('cartTotal').textContent = formatCurrency(total);
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        showError('Your cart is empty');
        return;
    }
    
    showSuccess('Order placed successfully!');
    cart = [];
    saveCart();
    updateCartCount();
    closeCart();
}

// Export functions
window.filterProducts = filterProducts;
window.filterByCategory = filterByCategory;
window.addToCart = addToCart;
window.buyNow = buyNow;
window.showCart = showCart;
window.closeCart = closeCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.proceedToCheckout = proceedToCheckout;

