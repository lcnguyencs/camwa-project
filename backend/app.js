import express from 'express';
import cors from 'cors';
import './src/models/index.js';  // Import models first
import apiRoutes from './src/routes/api.js';
import { initializeAssociations } from './src/models/associations.js';

// Initialize model associations
initializeAssociations();

const app = express();
app.use(cors());
app.use(express.json());  // Parse JSON bodies

// Routes
app.use('/api', apiRoutes);

export default app;
