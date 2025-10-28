const BASE_URL = "https://krushi-mitra-backend-1.onrender.com";

// Toggle between login & signup
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const goToSignup = document.getElementById("goToSignup");
  const goToLogin = document.getElementById("goToLogin");

  // Switch forms
  if (goToSignup) {
    goToSignup.addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.style.display = "none";
      signupForm.style.display = "block";
    });
  }

  if (goToLogin) {
    goToLogin.addEventListener("click", (e) => {
      e.preventDefault();
      signupForm.style.display = "none";
      loginForm.style.display = "block";
    });
  }

  // ===== LOGIN FUNCTION =====
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      if (!email || !password) return alert("⚠️ Please fill in all fields.");

      try {
        const res = await fetch(`${BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        console.log("Login response:", data);

        if (res.ok && data.success) {
          alert("✅ Login successful!");
          localStorage.setItem("user", JSON.stringify(data.user));
          window.location.href = "dashboard.html";
        } else {
          alert("❌ " + (data.message || "Login failed"));
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("🚨 Server error — please try again later.");
      }
    });
  }

  // ===== SIGNUP FUNCTION =====
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("signupName").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value.trim();

      if (!name || !email || !password) return alert("⚠️ Please fill in all fields.");

      try {
        const res = await fetch(`${BASE_URL}/api/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        console.log("Signup response:", data);

        if (res.ok && data.success) {
          alert("✅ Signup successful! Please log in now.");
          signupForm.reset();
          signupForm.style.display = "none";
          loginForm.style.display = "block";
        } else {
          alert("❌ " + (data.message || "Signup failed"));
        }
      } catch (err) {
        console.error("Signup error:", err);
        alert("🚨 Server error — please try again later.");
      }
    });
  }
});
