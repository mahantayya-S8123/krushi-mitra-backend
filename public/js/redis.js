/**
 * redis.js
 * KrushiMitra - Redis Cache & Session Management
 * Handles caching for mandi prices, user sessions, and service data.
 */

const redis = require("redis");

let client;

// === Connect to Redis ===
async function connectRedis() {
  try {
    client = redis.createClient({
      url: process.env.REDIS_URL || "redis://127.0.0.1:6379"
    });

    client.on("error", (err) => console.error("❌ Redis Error:", err));
    client.on("connect", () => console.log("✅ Redis Connected Successfully"));

    await client.connect();
  } catch (err) {
    console.error("🚨 Redis Connection Failed:", err);
  }
}

// === Set Data in Redis ===
async function setCache(key, value, ttlSeconds = 3600) {
  try {
    await client.setEx(key, ttlSeconds, JSON.stringify(value));
  } catch (err) {
    console.error("⚠️ Redis Set Error:", err);
  }
}

// === Get Data from Redis ===
async function getCache(key) {
  try {
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("⚠️ Redis Get Error:", err);
    return null;
  }
}

// === Delete Cache ===
async function deleteCache(key) {
  try {
    await client.del(key);
  } catch (err) {
    console.error("⚠️ Redis Delete Error:", err);
  }
}

// === Export ===
module.exports = {
  connectRedis,
  setCache,
  getCache,
  deleteCache
};
