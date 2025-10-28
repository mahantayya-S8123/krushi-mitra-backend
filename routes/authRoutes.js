const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: 'Missing required fields' });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ message: 'User already exists' });

    const user = new User({ name, email, phone, password, role });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secretkey');
    res.status(201).json({ message: 'User created successfully', token, user });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

module.exports = router;
