document.addEventListener('DOMContentLoaded', () => {
  const farmerBtn = document.getElementById('farmerBtn');
  const vendorBtn = document.getElementById('vendorBtn');

  farmerBtn?.addEventListener('click', async () => setRole('farmer'));
  vendorBtn?.addEventListener('click', async () => setRole('vendor'));

  async function setRole(role) {
    const { ok, data, error } = await authFetch(`${BASE_URL}/api/users/set-role`, {
      method: 'POST',
      body: JSON.stringify({ role })
    });
    if (ok) {
      localStorage.setItem('role', role);
      window.location.href = role === 'farmer' ? 'dashboard.html' : 'marketplace.html';
    } else {
      showNotification(error || 'Failed to set role', 'error');
    }
  }
});
