const express = require("express");
const router = express.Router();

// Fetch available services
router.get("/", (req, res) => {
  res.json([
    { name: "Soil Testing", price: 250 },
    { name: "Drone Spraying", price: 800 },
  ]);
});

// Book a service
router.post("/book", (req, res) => {
  res.json({ message: "Service booked successfully" });
});

module.exports = router;

