import express from 'express';
import cors from 'cors';
import rootRoutes from './src/routes/rootRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());  // Parse JSON bodies

// Routes
app.use('/api', rootRoutes);

export default app;
