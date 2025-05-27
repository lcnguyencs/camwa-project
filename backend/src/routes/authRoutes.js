import express from 'express';
import { loginUser, refreshToken, logOutUser, getCurrentUser } from '../controllers/authController.js';
import { authenticateJWT, verifyTokenAndRole } from '../middleware/authMiddleware.js';

const authRoutes = express.Router();

// Public routes
authRoutes.post('/login', loginUser);
authRoutes.post('/refresh-token', refreshToken);
authRoutes.post('/logout', logOutUser);

// Get current user
authRoutes.get('/me', verifyTokenAndRole(['ADMIN', 'FACULTY', 'LECTURER', 'STUDENT']), getCurrentUser);

// Role-based dashboard routes
authRoutes.get('/admin-dashboard', verifyTokenAndRole(['ADMIN']), (req, res) => {
    res.json({ message: 'Welcome to the admin dashboard' });
});

authRoutes.get('/faculty-dashboard', verifyTokenAndRole(['FACULTY']), (req, res) => {
    res.json({ message: 'Welcome to the faculty dashboard' });
});

authRoutes.get('/lecturer-dashboard', verifyTokenAndRole(['LECTURER']), (req, res) => {
    res.json({ message: 'Welcome to the lecturer dashboard' });
});

authRoutes.get('/student-dashboard', verifyTokenAndRole(['STUDENT']), (req, res) => {
    res.json({ message: 'Welcome to the student dashboard' });
});

export default authRoutes;
