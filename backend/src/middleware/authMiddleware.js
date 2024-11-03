import admin from '../config/firebaseConfig.js';  // Firebase Admin SDK initialized

// Middleware to authenticate the JWT token
export const authenticateJWT = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    console.warn("Authorization token missing");
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    // Verify the Firebase token (if using Firebase)
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Attach the decoded token details to the request object for further use in the app
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: decodedToken.role || 'student'  // Assuming default role if not present
    };

    next();  // Continue to the next middleware or route handler
  } catch (error) {
    console.error("Invalid token:", error);
    return res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

// Middleware to authorize based on user roles
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user && req.user.role;  // Ensure the role is set

    // Check if user role is allowed to access this route
    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
    }

    next();  // Continue to the next middleware or route handler
  };
};

// Middleware to verify Firebase token and check required roles in one step
export const verifyTokenAndRole = (requiredRoles) => {
  return async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    try {
      // Verify the Firebase token
      const decodedToken = await admin.auth().verifyIdToken(token);

      // Attach decoded token to request, with role or default to 'student' if role is not provided
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        role: decodedToken.role || 'student'
      };

      // Check if the user has the required role
      if (requiredRoles.includes(req.user.role)) {
        next();  // User has the required role, proceed
      } else {
        return res.status(403).json({ message: 'Access denied: Insufficient permissions.' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token', error: error.message });
    }
  };
};