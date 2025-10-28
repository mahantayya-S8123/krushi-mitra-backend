// ========================================
// KrushiMitra - Authentication Logic (Connected to Live Backend)
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initAuth();
});

// Initialize authentication
function initAuth() {
    const loginForm = document.getElementById('loginFormElement');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);

    const signupForm = document.getElementById('signupFormElement');
    if (signupForm) signupForm.addEventListener('submit', handleSignup);
}

// ========================================
// Backend Base URL
// ========================================
const BASE_URL = "https://krushi-mitra-backend-1.onrender.com";

// ========================================
// Login Handler
// ========================================
async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) return showError('Please fill all fields');
    if (!isValidEmail(email)) return showError('Invalid email format');

    showLoader('loginSpinner');
    hideMessages();

    try {
        const res = await fetch(`${BASE_URL}/api/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            showSuccess('✅ Login Successful! Redirecting...');
            speak('Login successful');

            setTimeout(() => {
                if (data.user.role === 'farmer') window.location.href = 'dashboard.html';
                else if (data.user.role === 'vendor') window.location.href = 'vendor.html';
                else window.location.href = 'admin.html';
            }, 1500);
        } else {
            showError(data.message || 'Login failed. Please try again.');
            speak('Login failed');
        }
    } catch (err) {
        showError('⚠️ Server not reachable. Please check connection.');
    } finally {
        hideLoader('loginSpinner');
    }
}

// ========================================
// Signup Handler
// ========================================
async function handleSignup(e) {
    e.preventDefault();

    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const role = document.getElementById('signupRole').value;
    const location = document.getElementById('signupLocation').value.trim();

    if (!name || !email || !password) return showError('Please fill all fields');
    if (!isValidEmail(email)) return showError('Invalid email');
    if (password.length < 6) return showError('Password must be ≥ 6 chars');

    showLoader('signupSpinner');
    hideMessages();

    try {
        const res = await fetch(`${BASE_URL}/api/users/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role, location })
        });

        const data = await res.json();

        if (res.ok) {
            showSuccess('🎉 Signup successful! Please log in.');
            speak('Signup successful');
            document.getElementById('signupFormElement').reset();
            setTimeout(() => showLogin(), 1500);
        } else {
            showError(data.message || 'Signup failed.');
            speak('Signup failed');
        }
    } catch (err) {
        showError('⚠️ Server not reachable. Please check connection.');
    } finally {
        hideLoader('signupSpinner');
    }
}

// ========================================
// Utility Helpers
// ========================================
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(msg) {
    alert('❌ ' + msg);
}

function showSuccess(msg) {
    alert(msg);
}

function hideMessages() {}

function showLoader(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = 'inline-block';
}

function hideLoader(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
}

function speak(text) {
    if ('speechSynthesis' in window) {
        const utter = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utter);
    }
}

function showLogin() {
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('signupForm').classList.remove('active');
}
