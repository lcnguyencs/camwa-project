import admin from '../config/firebaseConfig.js';
import { generateToken } from '../config/jwtConfig.js';
import Iam from '../models/Iam.model.js';  // Import the Iam model

const authService = {
    login: async (req) => {
        const { idToken } = req.body;  // The ID token sent from the client
        
        // Verify Firebase ID token using Firebase Admin SDK
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { uid, email } = decodedToken;

        // Retrieve the user role from the Iam database using the UID (Firebase UID)
        const user = await Iam.findOne({ where: { acc_id: uid } });

        if (!user) {
            throw new Error()
            return res.status(404).json({ message: 'User not found in the system' });
        }

        // Get the user's role, or default to 'student' if no role is found
        const userRole = user.role || 'student';

        // Generate JWT token including the user's role and Firebase UID
        const jwtToken = generateToken({ uid, email, role: userRole });

        return { jwtToken, role: userRole }
    }
}

export default authService;