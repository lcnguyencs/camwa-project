const express = require('express');
const admin = require('../config/firebaseConfig');
const { generateToken } = require('../config/jwtConfig');
const { authenticateJWT, authorizeRoles, verifyTokenAndRole } = require('../middleware/authMiddleware');

const router = express.Router();

// User Login - Firebase authentication
router.post('/login', async (req, res) => {
  const { idToken } = req.body;

  try {
    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const userRole = await getUserRole(decodedToken.uid);  // Get role from your database or Firebase custom claims

    // Generate JWT including the user's role
    const token = generateToken(decodedToken, userRole);

    return res.status(200).json({ token, role: userRole });
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
});

// Admin dashboard route - Only accessible to admin users
router.get('/admin-dashboard', verifyTokenAndRole(['admin']), (req, res) => {
  res.send('Welcome to the admin dashboard.');
});

// Faculty dashboard - Accessible to both faculty assistants and lecturers
router.get('/faculty-dashboard', verifyTokenAndRole(['faculty_assistant', 'lecturer']), (req, res) => {
  res.send('Welcome to the faculty dashboard.');
});

// A protected route for faculty assistant roles
router.get('/protected', authenticateJWT, authorizeRoles('faculty_assistant'), (req, res) => {
  res.send('You are authorized as a faculty assistant');
});

// Mock function to get the user's role
async function getUserRole(uid) {
  // For simplicity, this should query your database or get Firebase custom claims
  if (uid === 'admin_uid') return 'admin';
  if (uid === 'faculty_uid') return 'faculty_assistant';
  if (uid === 'student_uid') return 'student';
  if (uid === 'lecturer_uid') return 'lecturer';
  return 'student';  // Default role
}

module.exports = router;
