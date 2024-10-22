import admin from '../config/firebaseConfig.js';  // Firebase Admin SDK initialized
import jwt from 'jsonwebtoken';

// Middleware to authenticate the JWT token
export const authenticateJWT = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    // Verify the Firebase token (if using Firebase)
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;  // Attach decoded token to the request

    next();  // Continue to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

// Middleware to authorize based on user roles
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user && req.user.role;  // Ensure the role is set

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
    }

    next();  // Continue to the next middleware or route handler
  };
};

// Middleware to verify token and role for specific routes
export const verifyTokenAndRole = (requiredRoles) => {
  return async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    try {
      // Verify the Firebase token
      const decodedToken = await admin.auth().verifyIdToken(token);

      // Check if the user has the required role
      if (requiredRoles.includes(decodedToken.role)) {
        req.user = decodedToken;  // Attach the decoded token to the request
        next();
      } else {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token', error: error.message });
    }
  };
};
