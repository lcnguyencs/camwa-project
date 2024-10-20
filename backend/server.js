import express from 'express';
import sequelize from './src/config/database.js';  // Sequelize setup for database connection
import rootRoutes from './src/routes/rootRoutes.js';  // Import the root routes
import cors from 'cors';

const app = express();  // Initialize the Express app
const PORT = process.env.PORT || 3000;

app.use(cors());

// Middleware
app.use(express.json());  // Middleware to parse JSON bodies

// Example API route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Routes
app.use(rootRoutes);

// Start the server only after syncing with the database
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch(err => console.error('Database connection failed:', err));

export default app;
