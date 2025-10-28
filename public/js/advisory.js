/**
 * advisory.js
 * KrushiMitra - AI Advisory + Weather Assistant
 * Fetches live weather + gives smart crop suggestions.
 */

const weatherInfo = document.getElementById("weatherInfo");

// === AUTO FETCH WEATHER ===
async function getWeather() {
  try {
    weatherInfo.innerHTML = "🌦 Fetching local weather data...";
    const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=16.83&longitude=75.71&daily=temperature_2m_max,precipitation_sum&forecast_days=1");
    const data = await res.json();

    const temp = data.daily.temperature_2m_max[0];
    const rain = data.daily.precipitation_sum[0];

    let advice = "";
    if (rain > 5) {
      advice = "🌧️ Expect rainfall — delay fertilizer use and ensure drainage.";
    } else if (temp > 34) {
      advice = "🔥 High temperature — irrigate crops early morning or evening.";
    } else {
      advice = "🌿 Good weather — perfect for sowing or light pesticide spray.";
    }

    weatherInfo.innerHTML = `
      <div class="weather-card">
        <h3>Bijapur Weather</h3>
        <p><b>Max Temp:</b> ${temp}°C</p>
        <p><b>Rainfall:</b> ${rain} mm</p>
        <hr>
        <p><b>Advisory:</b> ${advice}</p>
      </div>
    `;
  } catch (err) {
    weatherInfo.innerHTML = "⚠️ Could not fetch weather. Please try again.";
    console.error("Weather fetch error:", err);
  }
}

// === AI ADVISORY MOCK (OPTIONAL BACKEND HOOK) ===
async function getAIAdvice(cropName) {
  try {
    const res = await fetch(`/api/advisory?crop=${cropName}`);
    const data = await res.json();
    alert(`🌾 Advisory for ${cropName}:\n\n${data.advice}`);
  } catch (err) {
    alert("Error fetching AI advisory");
  }
}

// === INIT ===
document.addEventListener("DOMContentLoaded", getWeather);

