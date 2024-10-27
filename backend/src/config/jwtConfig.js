import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your_jwt_secret';
const refreshSecret = process.env.JWT_REFRESH_SECRET || 'your_refresh_jwt_secret';

// Generate Access and Refresh Tokens
export const generateTokens = (user) => {
  const accessToken = jwt.sign(
    {
      uid: user.uid,
      email: user.email,
      role: user.role,
    },
    secret,
    { expiresIn: '1h' }
  );

  const refreshToken = jwt.sign(
    {
      uid: user.uid,
      email: user.email,
      role: user.role,
    },
    refreshSecret,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

// Verify Access Token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error('Invalid access token');
  }
};

// Verify Refresh Token
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, refreshSecret);
  } catch (err) {
    throw new Error('Invalid refresh token');
  }
};
