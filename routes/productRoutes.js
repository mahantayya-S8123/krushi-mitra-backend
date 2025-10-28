const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    { name: "Tractor", price: 450000 },
    { name: "Fertilizer", price: 1200 }
  ]);
});

module.exports = router;
