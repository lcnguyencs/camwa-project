const express = require('express');
const sequelize = require('./src/config/database');  // Sequelize setup for database connection
const rootRoutes = require('./src/routes/rootRoutes');    // Import the authentication routes

const app = express();  // Initialize the Express app
const PORT = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());

// Middleware
app.use(express.json());  // Middleware to parse JSON bodies

// Example API route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Routes
app.use(rootRoutes)

// Start the server only after syncing with the database
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch(err => console.error('Database connection failed:', err));

module.exports = app;
