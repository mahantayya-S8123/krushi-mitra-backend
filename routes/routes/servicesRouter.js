// backend/routes/serviceRoutes.js
const express = require("express");
const router = express.Router();

router.get("/services", (req, res) => {
  res.json([
    { name: "Soil Testing", price: 250 },
    { name: "Drone Spraying", price: 800 }
  ]);
});

router.post("/book-service", (req, res) => {
  res.status(200).json({ message: "Service booked successfully" });
});

module.exports = router;
