import express from 'express';
import { loginUser } from '../controllers/authController.js';  // Import the login logic from the controller
import { authenticateJWT, authorizeRoles, verifyTokenAndRole } from '../middleware/authMiddleware.js';  // Middleware for token and roles

const authRoutes = express.Router();

// User Login - Firebase authentication
authRoutes.post('/login', loginUser);

// Admin dashboard route - Only accessible to admin users
authRoutes.get('/admin-dashboard', verifyTokenAndRole(['admin']), (req, res) => {
  res.send('Welcome to the admin dashboard.');
});

// Faculty dashboard - Accessible to both faculty assistants and lecturers
authRoutes.get('/faculty-dashboard', verifyTokenAndRole(['faculty_assistant', 'lecturer']), (req, res) => {
  res.send('Welcome to the faculty dashboard.');
});

// A protected route for faculty assistant roles
authRoutes.get('/protected', authenticateJWT, authorizeRoles('faculty_assistant'), (req, res) => {
  res.send('You are authorized as a faculty assistant');
});

export default authRoutes;
