const express = require("express");
const router = express.Router();

// Login route
router.post("/login", (req, res) => {
  res.json({ message: "Login successful" });
});

// Register route
router.post("/register", (req, res) => {
  res.json({ message: "User registered successfully" });
});

module.exports = router;
