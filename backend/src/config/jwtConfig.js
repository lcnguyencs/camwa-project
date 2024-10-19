const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'your_jwt_secret';

module.exports.generateToken = (user, role) => {
  return jwt.sign(
    {
      uid: user.uid,
      email: user.email,
      role: role,  // Include the user's role in the token
    },
    secret,
    { expiresIn: '1h' }  // Token expires in 1 hour
  );
};

module.exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error('Invalid token');
  }
};
