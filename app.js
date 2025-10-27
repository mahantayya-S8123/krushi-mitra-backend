// Main app entry point for KrushiMitra backend
const path = require('path');

// Check if MongoDB URI is configured, if not use simpler server
if (process.env.MONGO_URI) {
    // Use full MongoDB version
    require('./config/app.js');
} else {
    // Use simple server without DB
    require('./config/server.js');
}

