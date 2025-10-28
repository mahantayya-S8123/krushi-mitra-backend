const express = require("express");
const router = express.Router();

// Get mandi prices
router.get("/", (req, res) => {
  res.json([
    { crop: "Wheat", price: 2300 },
    { crop: "Rice", price: 2500 },
    { crop: "Sugarcane", price: 3100 },
  ]);
});

// Update or fetch specific mandi details
router.get("/:cropName", (req, res) => {
  const { cropName } = req.params;
  res.json({ crop: cropName, price: 2400 });
});

module.exports = router;
