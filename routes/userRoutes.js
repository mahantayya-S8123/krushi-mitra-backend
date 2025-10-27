const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Example: secure password hashing (for later)
router.post('/users', async (req, res) => {
  const { password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  res.status(201).json({ hashed });
});

module.exports = router;


