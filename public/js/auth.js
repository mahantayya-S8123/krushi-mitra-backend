/* auth.js — login & signup */
document.addEventListener('DOMContentLoaded', () => {
  // form elements
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const goToSignup = document.getElementById('goToSignup');
  const goToLogin = document.getElementById('goToLogin');

  function showForm(which) {
    if (loginForm) loginForm.classList.toggle('active', which === 'login');
    if (signupForm) signupForm.classList.toggle('active', which === 'signup');
  }

  goToSignup?.addEventListener('click', (e)=> { e.preventDefault(); showForm('signup'); });
  goToLogin?.addEventListener('click', (e)=> { e.preventDefault(); showForm('login'); });

  loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail')?.value.trim();
    const password = document.getElementById('loginPassword')?.value || '';
    if (!email || !password) return showNotification('Please fill all fields', 'error');
    if (!isValidEmail(email)) return showNotification('Invalid email', 'error');

    showLoader('loginSpinner');
    const { ok, data, error } = await authFetch(`${BASE_URL}/api/users/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    hideLoader('loginSpinner');

    if (ok && data.token) {
      localStorage.setItem('token', data.token);
      setCurrentUser(data.user || { name: data.name || email });
      showNotification('Login successful');
      speak('Login successful');
      // redirect
      const role = (data.user && data.user.role) || 'farmer';
      setTimeout(()=> {
        if (role === 'farmer') window.location.href = 'dashboard.html';
        else if (role === 'vendor') window.location.href = 'marketplace.html';
        else window.location.href = 'dashboard.html';
      }, 600);
    } else {
      showNotification(data?.message || error || 'Login failed', 'error');
      speak('Login failed');
    }
  });

  signupForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName')?.value.trim();
    const email = document.getElementById('signupEmail')?.value.trim();
    const phone = document.getElementById('signupPhone')?.value.trim();
    const password = document.getElementById('signupPassword')?.value || '';
    if (!name || !email || !phone || !password) return showNotification('Please fill all fields', 'error');
    if (!isValidEmail(email)) return showNotification('Invalid email', 'error');
    if (password.length < 6) return showNotification('Password must be ≥ 6 chars', 'error');

    showLoader('signupSpinner');
    const { ok, data, error } = await authFetch(`${BASE_URL}/api/users/signup`, {
      method: 'POST',
      body: JSON.stringify({ name, email, phone, password })
    });
    hideLoader('signupSpinner');

    if (ok) {
      showNotification('Signup successful — please login');
      speak('Signup successful');
      // reset & show login
      signupForm.reset();
      showForm('login');
    } else {
      showNotification(data?.message || error || 'Signup failed', 'error');
      speak('Signup failed');
    }
  });
});
