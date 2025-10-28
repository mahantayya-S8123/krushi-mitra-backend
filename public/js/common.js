// ========================================
// KrushiMitra - Common Utilities
// ========================================

// Global variables
let currentLanguage = localStorage.getItem('language') || 'en';
let isVoiceEnabled = localStorage.getItem('voiceEnabled') === 'true';
let currentUser = JSON.parse(localStorage.getItem('user') || 'null');

// Translation data
const translations = {
    en: {
        'welcome': 'Welcome',
        'welcomeBack': 'Welcome back',
        'goodMorning': 'Good morning',
        'goodAfternoon': 'Good afternoon',
        'goodEvening': 'Good evening',
        'loading': 'Loading...',
        'error': 'Error',
        'success': 'Success',
        'logout': 'Logout',
        'login': 'Login',
        'signup': 'Sign Up',
        'email': 'Email',
        'password': 'Password',
        'phone': 'Phone',
        'name': 'Name',
        'dashboard': 'Dashboard',
        'mandiPrices': 'Mandi Prices',
        'marketplace': 'Marketplace',
        'services': 'Services',
        'advisory': 'Advisory'
    },
    hi: {
        'welcome': 'स्वागत',
        'welcomeBack': 'वापसी पर स्वागत है',
        'goodMorning': 'सुप्रभात',
        'goodAfternoon': 'नमस्कार',
        'goodEvening': 'शुभ संध्या',
        'loading': 'लोड हो रहा है...',
        'error': 'त्रुटि',
        'success': 'सफल',
        'logout': 'लॉगआउट',
        'login': 'लॉगिन',
        'signup': 'साइन अप',
        'email': 'ईमेल',
        'password': 'पासवर्ड',
        'phone': 'फोन',
        'name': 'नाम',
        'dashboard': 'डैशबोर्ड',
        'mandiPrices': 'मंडी कीमतें',
        'marketplace': 'बाज़ार',
        'services': 'सेवाएं',
        'advisory': 'सलाह'
    },
    mr: {
        'welcome': 'स्वागत आहे',
        'welcomeBack': 'परत स्वागत आहे',
        'goodMorning': 'सुप्रभात',
        'goodAfternoon': 'नमस्कार',
        'goodEvening': 'शुभ संध्या',
        'loading': 'लोड होत आहे...',
        'error': 'त्रुटी',
        'success': 'यशस्वी',
        'logout': 'लॉगआउट',
        'login': 'लॉगिन',
        'signup': 'साइन अप',
        'email': 'ईमेल',
        'password': 'पासवर्ड',
        'phone': 'फोन',
        'name': 'नाव',
        'dashboard': 'डॅशबोर्ड',
        'mandiPrices': 'मंडी किंमती',
        'marketplace': 'बाजार',
        'services': 'सेवा',
        'advisory': 'सल्ला'
    }
};

// Initialize common functionality
document.addEventListener('DOMContentLoaded', function() {
    initLanguage();
    initVoice();
});

// Language functions
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updatePageTranslations();
    showNotification(`Language changed to ${lang.toUpperCase()}`);
}

function initLanguage() {
    // Set language selectors
    const langSelects = document.querySelectorAll('#langSelect, #langSelect2');
    langSelects.forEach(select => {
        if (select) {
            select.value = currentLanguage;
        }
    });
    updatePageTranslations();
}

function updatePageTranslations() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getTranslation(key);
        if (translation) {
            element.textContent = translation;
        }
    });
}

function getTranslation(key) {
    return translations[currentLanguage] && translations[currentLanguage][key] 
        ? translations[currentLanguage][key] 
        : key;
}

// Voice functions
function initVoice() {
    if ('speechSynthesis' in window) {
        speechSynthesis = window.speechSynthesis;
    }
}

function speak(text) {
    if (isVoiceEnabled && speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : 
                        currentLanguage === 'mr' ? 'mr-IN' : 'en-US';
        speechSynthesis.speak(utterance);
    }
}

function toggleVoice() {
    isVoiceEnabled = !isVoiceEnabled;
    localStorage.setItem('voiceEnabled', isVoiceEnabled);
    showNotification(isVoiceEnabled ? 'Voice enabled' : 'Voice disabled');
}

// Utility functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showLoader(spinnerId) {
    const spinner = document.getElementById(spinnerId);
    if (spinner) {
        spinner.style.display = 'inline-block';
    }
}

function hideLoader(spinnerId) {
    const spinner = document.getElementById(spinnerId);
    if (spinner) {
        spinner.style.display = 'none';
    }
}

function showError(message, elementId = 'errorMessage') {
    const errorDiv = document.getElementById(elementId);
    const errorText = document.getElementById('errorText');
    
    if (errorDiv && errorText) {
        errorText.textContent = message;
        errorDiv.style.display = 'block';
        
        // Hide success message
        const successDiv = document.getElementById('successMessage');
        if (successDiv) successDiv.style.display = 'none';
    }
}

function showSuccess(message, elementId = 'successMessage') {
    const successDiv = document.getElementById(elementId);
    
    if (successDiv) {
        successDiv.style.display = 'block';
        
        // Hide error message
        const errorDiv = document.getElementById('errorMessage');
        if (errorDiv) errorDiv.style.display = 'none';
    }
}

function hideMessages() {
    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');
    
    if (errorDiv) errorDiv.style.display = 'none';
    if (successDiv) successDiv.style.display = 'none';
}

// Mock API call
async function mockApiCall(endpoint, data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate different responses
            if (endpoint === '/api/login') {
                if (data.email && data.password) {
                    resolve({ success: true, message: 'Login successful' });
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }
            else if (endpoint === '/api/signup') {
                resolve({ success: true, message: 'Account created successfully' });
            }
            else {
                resolve({ success: true, data: {} });
            }
        }, 1000);
    });
}

// User management
function getCurrentUser() {
    return currentUser;
}

function setCurrentUser(user) {
    currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
}

function logout() {
    currentUser = null;
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Time-based greeting
function getTimeBasedGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return getTranslation('goodMorning');
    if (hour < 17) return getTranslation('goodAfternoon');
    return getTranslation('goodEvening');
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);