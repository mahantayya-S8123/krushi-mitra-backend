// =========================================
// KrushiMitra - Unified Backend + Frontend Server
// =========================================

// --------------------
// Import required modules
// --------------------
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// --------------------
// Configuration
// --------------------
dotenv.config();
const app = express();

// ✅ Render dynamically assigns port
const PORT = process.env.PORT || 4000;

// --------------------
// Middleware
// --------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ handles form submissions

// --------------------
// MongoDB Connection
// --------------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  });

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected. Retrying connection...");
});

// --------------------
// Routes
// --------------------

// ✅ Ensure these files exist inside /routes folder
const authRoutes = require("../routes/authRoutes");
const serviceRoutes = require("../routes/servicesRoutes");
const mandiRoutes = require("../routes/mandiRoutes");
const productRoutes = require("../routes/productRoutes");

// ✅ Route Mounting
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/mandi", mandiRoutes);
app.use("/api/products", productRoutes);

// --------------------
// Test DB Routes
// --------------------
const User = require("../models/User");

app.get("/api/test-db", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, count: users.length, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/api/test-db", async (req, res) => {
  try {
    const { name, email, password, role, location } = req.body;
    const newUser = new User({ name, email, password, role, location });
    await newUser.save();
    res.status(201).json({ success: true, user: newUser });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// --------------------
// Health Check
// --------------------
app.get("/api/ping", (req, res) => res.send("pong"));

// --------------------
// Frontend Integration
// --------------------
// ✅ Serve static frontend files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "../public")));

// ✅ Fallback for any unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// --------------------
// Start Server
// --------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Visit: https://krushi-mitra-backend-1.onrender.com`);
});
