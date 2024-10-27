import bcrypt from 'bcrypt';
import admin from '../config/firebaseConfig.js';
import { generateTokens, verifyRefreshToken } from '../config/jwtConfig.js';
import Iam from '../models/Iam.model.js';

const authService = {
  register: async (userData) => {
    const { acc_id, username, email, password, role } = userData;

    // Hash the password before saving to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the user with hashed password
    const newUser = await Iam.create({
      acc_id,
      username,
      email,
      password: hashedPassword,
      role: role || 'student',
    });

    return newUser;
  },

  login: async (req) => {
    const { idToken, password } = req.body;  // ID token and password from the client

    // Verify Firebase ID token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    // Retrieve the user from the database using the UID
    const user = await Iam.findOne({ where: { acc_id: uid } });

    if (!user) {
      throw new Error('User not found');
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    // Generate both access and refresh tokens with user's role and Firebase UID
    const userRole = user.role || 'student';
    const { accessToken, refreshToken } = generateTokens({ uid, email, role: userRole });

    return { accessToken, refreshToken, role: userRole };
  },

  refreshAccessToken: async (refreshToken) => {
    // Verify the refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Generate new access and refresh tokens if verification is successful
    const { accessToken, refreshToken: newRefreshToken } = generateTokens({
      uid: decoded.uid,
      email: decoded.email,
      role: decoded.role,
    });

    return { accessToken, refreshToken: newRefreshToken };
  },
};

export default authService;
