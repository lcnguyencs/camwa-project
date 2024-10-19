const admin = require('../config/firebaseConfig');  // Firebase Admin SDK initialized
const { verifyToken } = require('../config/jwtConfig');  // Optional if you're using JWT

module.exports.verifyTokenAndRole = (requiredRoles) => {
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
        req.user = decodedToken;
        next();
      } else {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token', error: error.message });
    }
  };
};
