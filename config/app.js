// --------------------
// Import required modules
// --------------------
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path'); // ✅ imported at top

// --------------------
// Configurations
// --------------------
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// --------------------
// Middleware
// --------------------
app.use(cors());
app.use(express.json());

// --------------------
// MongoDB Connection
// --------------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
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
const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// --------------------
// Test DB Routes
// --------------------
const User = require('../models/User');

// GET all users
app.get('/api/test-db', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, count: users.length, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST create test user
app.post('/api/test-db', async (req, res) => {
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
app.get('/api/ping', (req, res) => res.send('pong'));

// --------------------
// Frontend Integration
// --------------------
// Serve static frontend files
app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});


// other backend routes...


// --------------------
// Start Server
// --------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
