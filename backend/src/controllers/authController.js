import admin from '../config/firebaseConfig.js';
import { generateToken } from '../config/jwtConfig.js';

export const loginUser = async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const userRole = decodedToken.role || 'student';  // Default to student if no role is set

    // Optionally, generate a JWT for session management
    const jwtToken = generateToken(decodedToken, userRole);

    res.status(200).json({ jwtToken, role: userRole });
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
};
