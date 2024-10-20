import admin from '../config/firebaseConfig.js';
import { generateToken } from '../config/jwtConfig.js';
import Iam from '../models/Iam.model.js';  // Import the Iam model

// User Login Controller
export const loginUser = async (req, res) => {
  const { idToken } = req.body;  // The ID token sent from the client

  try {
    // Verify Firebase ID token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    // Retrieve the user role from the Iam database using the UID (Firebase UID)
    const user = await Iam.findOne({ where: { acc_id: uid } });

    if (!user) {
      return res.status(404).json({ message: 'User not found in the system' });
    }

    // Get the user's role, or default to 'student' if no role is found
    const userRole = user.role || 'student';

    // Generate JWT token including the user's role and Firebase UID
    const jwtToken = generateToken({ uid, email, role: userRole });

    // Send the JWT token and role back to the client
    return res.status(200).json({ jwtToken, role: userRole });
  } catch (error) {
    // Handle errors (e.g., invalid token, user not found)
    return res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
};
