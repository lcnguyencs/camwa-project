const express = require('express');
const sequelize = require('./src/config/database');  // Sequelize setup for database connection
const authRoutes = require('./routes/authRoutes');    // Import the authentication routes

const app = express();  // Initialize the Express app
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());  // Middleware to parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);  // Authentication-related routes

// Start the server only after syncing with the database
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch(err => console.error('Database connection failed:', err));

module.exports = app;
