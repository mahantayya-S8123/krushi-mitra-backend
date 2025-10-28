/**
 * services.js
 * KrushiMitra - Agricultural Service Booking System
 * Enables farmers to browse and book verified agri-services.
 */

const serviceContainer = document.querySelector(".grid");
let services = [];

// === Fetch Services (from backend or mock data) ===
async function loadServices() {
  try {
    serviceContainer.innerHTML = "🔄 Loading available services...";

    // If backend exists, use: const res = await fetch("/api/services");
    // const data = await res.json();
    // For now, mock data:
    const data = [
      {
        name: "Soil Testing",
        description: "Get your soil health analyzed for nutrients & pH.",
        price: 250,
        provider: "AgroLab Solutions"
      },
      {
        name: "Tractor Hire",
        description: "Rent a tractor or equipment for your farm easily.",
        price: 1200,
        provider: "RuralTractors Pvt Ltd"
      },
      {
        name: "Drone Spraying",
        description: "AI-powered pesticide spraying using drones.",
        price: 800,
        provider: "SkyAgroTech"
      },
      {
        name: "Irrigation Setup",
        description: "Drip & sprinkler installation for efficient watering.",
        price: 3500,
        provider: "GreenFlow Systems"
      }
    ];

    services = data;
    renderServiceCards();
  } catch (err) {
    serviceContainer.innerHTML = "⚠️ Unable to load services.";
    console.error(err);
  }
}

// === Render Cards ===
function renderServiceCards() {
  serviceContainer.innerHTML = services.map(s => `
    <div class="card">
      <h3>${s.name}</h3>
      <p>${s.description}</p>
      <p><b>Provider:</b> ${s.provider}</p>
      <p><b>Price:</b> ₹${s.price}</p>
      <button class="btn btn-secondary" onclick="bookService('${s.name}')">Book Now</button>
    </div>
  `).join("");
}

// === Book a Service ===
async function bookService(serviceName) {
  const farmerName = localStorage.getItem("userName") || "Farmer";

  const confirmation = confirm(`Confirm booking for: ${serviceName}?`);
  if (!confirmation) return;

  try {
    const res = await fetch("/api/book-service", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service: serviceName,
        user: farmerName,
        date: new Date().toISOString()
      })
    });

    if (!res.ok) throw new Error("Booking failed");
    alert(`✅ ${serviceName} booked successfully! Our team will contact you soon.`);
  } catch (err) {
    alert("⚠️ Error booking service. Try again.");
    console.error(err);
  }
}

// === Init ===
document.addEventListener("DOMContentLoaded", loadServices);
