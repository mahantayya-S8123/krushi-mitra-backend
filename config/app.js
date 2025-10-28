
// =========================================
// 🌾 KrushiMitra - Unified Backend + Frontend Server
// =========================================

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// --------------------
// Middleware
// --------------------
app.use(
  cors({
    origin: ["http://localhost:4000", "https://krushi-mitra-frontend.onrender.com"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// --------------------
// API Routes
// --------------------
const authRoutes = require("../routes/authRoutes");
const serviceRoutes = require("../routes/servicesRoutes");
const mandiRoutes = require("../routes/mandiRoutes");
const productRoutes = require("../routes/productRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/mandi", mandiRoutes);
app.use("/api/products", productRoutes);

// --------------------
// Common API (Frontend-Compatible)
// --------------------
app.get("/api/common", (req, res) => {
  res.json({
    name: "KrushiMitra Unified API",
    status: "Active",
    version: "1.0",
    base_url: "https://krushi-mitra-backend-1.onrender.com",
    endpoints: {
      auth: "/api/auth",
      services: "/api/services",
      mandi: "/api/mandi",
      products: "/api/products",
    },
  });
});

// --------------------
// DB Test Routes
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
// Serve Frontend Files
// --------------------
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

// ✅ SPA Route Fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// --------------------
// Start Server
// --------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Visit: http://localhost:${PORT}`);
});
