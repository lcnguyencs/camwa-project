import express from 'express';
import { loginUser, createUser, refreshToken } from '../controllers/authController.js';
import { authenticateJWT, verifyTokenAndRole } from '../middleware/authMiddleware.js';

const authRoutes = express.Router();

// User Login - Firebase authentication
authRoutes.post('/login', loginUser);

// Route to refresh the access token
authRoutes.post('/refresh-token', refreshToken);

// Route for logging out
authRoutes.post('/logout', logOutUser);

// Route for admin to create a user
authRoutes.post('/create-user', verifyTokenAndRole(['admin']), createUser);

// Admin dashboard route - Only accessible to admin users
authRoutes.get('/admin-dashboard', verifyTokenAndRole(['admin']), (req, res) => {
    res.send('Welcome to the admin dashboard.');
});

// Faculty Assistant dashboard - Accessible only to faculty assistants
authRoutes.get('/faculty-assistant-dashboard', verifyTokenAndRole(['faculty_assistant']), (req, res) => {
    res.send('Welcome to the faculty assistant dashboard.');
});

// Lecturer dashboard - Accessible only to lecturers
authRoutes.get('/lecturer-dashboard', verifyTokenAndRole(['lecturer']), (req, res) => {
    res.send('Welcome to the lecturer dashboard.');
});

// Student dashboard - Accessible only to students
authRoutes.get('/student-dashboard', verifyTokenAndRole(['student']), (req, res) => {
    res.send('Welcome to the student dashboard.');
});

export default authRoutes;
