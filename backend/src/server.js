

// src/server.js
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes'); // Import routes

const app = express();
app.use(express.json()); // To parse JSON request bodies
app.use(cors());

// Use the routes
app.use(taskRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;  // Export app for testing purposes
