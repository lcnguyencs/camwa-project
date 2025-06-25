import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import Iam from '../models/Iam.model.js';
import AcademicCoordinator from '../models/AcademicCoordinator.model.js';
import { UnauthorizedError, NotFoundError } from '../common/helpers/error.helper.js';
import tokenBlacklistService from './tokenBlacklist.service.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret';

const authService = {
  login: async (credentials) => {
    const { email, password } = credentials;

    const user = await Iam.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundError('User not found');
    }    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Determine the role to use in the token
    let roleForToken = user.role;
    
    // If user has AC role, get the current_role from AcademicCoordinator table
    if (user.role === 'AC') {
      const academicCoordinator = await AcademicCoordinator.findOne({ 
        where: { ac_id: user.iam_id } 
      });
      
      if (academicCoordinator) {
        roleForToken = academicCoordinator.current_role;
      }
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { uid: user.iam_id, 
        email: user.email, 
        role: roleForToken, 
        username: user.username},
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { uid: user.iam_id },
      JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    // Store refresh token in database
    await user.update({ refresh_token: refreshToken });    return {
      accessToken,
      refreshToken,
      role: roleForToken,
      username: user.username
    };
  },

  refreshAccessToken: async (refreshToken) => {
    if (!refreshToken) {
      throw new UnauthorizedError('Refresh token required');
    }

    const user = await Iam.findOne({ where: { refresh_token: refreshToken } });
    if (!user) {
      throw new UnauthorizedError('Invalid refresh token');
    }    try {
      const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
      
      // Determine the role to use in the token
      let roleForToken = user.role;
      
      // If user has AC role, get the current_role from AcademicCoordinator table
      if (user.role === 'AC') {
        const academicCoordinator = await AcademicCoordinator.findOne({ 
          where: { ac_id: user.iam_id } 
        });
        
        if (academicCoordinator) {
          roleForToken = academicCoordinator.current_role;
        }
      }
      
      const accessToken = jwt.sign(
        { uid: user.iam_id, 
          email: user.email, 
          role: roleForToken, 
          username: user.username },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      return { accessToken };
    } catch (error) {
      await user.update({ refresh_token: null });
      throw new UnauthorizedError('Invalid refresh token');
    }
  },  logOut: async (accessToken) => {
    if (!accessToken) {
      throw new UnauthorizedError('Access token required');
    }

    try {
      // Verify and decode the access token to extract user ID
      const decoded = jwt.verify(accessToken, JWT_SECRET);
      const userId = decoded.uid;

      // Find the user in the database
      const user = await Iam.findOne({ where: { iam_id: userId } });
      if (!user) {
        throw new NotFoundError('User not found');
      }

      // Additional security check: ensure the token wasn't already invalidated
      if (!user.refresh_token) {
        // User might already be logged out, but we'll treat this as success
        // to prevent information leakage about user session state
        return { 
          message: 'Logged out successfully',
          userId: userId
        };
      }

      // Blacklist the current access token immediately
      tokenBlacklistService.blacklistToken(accessToken, decoded.exp * 1000); // exp is in seconds, convert to milliseconds

      // Clear the refresh token to invalidate the user session
      await user.update({ refresh_token: null });

      return { 
        message: 'Logged out successfully',
        userId: userId,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      // Handle JWT verification errors
      if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedError('Invalid access token');
      }
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedError('Access token has expired');
      }
      // Re-throw other errors (like database errors)
      throw error;
    }
  },  logOutFromAllDevices: async (accessToken) => {
    if (!accessToken) {
      throw new UnauthorizedError('Access token required');
    }

    try {
      // Verify and decode the access token to extract user ID
      const decoded = jwt.verify(accessToken, JWT_SECRET);
      const userId = decoded.uid;

      // Find the user in the database
      const user = await Iam.findOne({ where: { iam_id: userId } });
      if (!user) {
        throw new NotFoundError('User not found');
      }

      // Blacklist the current access token
      tokenBlacklistService.blacklistToken(accessToken, decoded.exp * 1000);
      
      // Invalidate ALL tokens for this user (including other devices)
      tokenBlacklistService.blacklistAllUserTokens(userId);

      // Clear the refresh token to invalidate all user sessions
      await user.update({ 
        refresh_token: null,
      });

      return { 
        message: 'Logged out from all devices successfully',
        userId: userId,
        timestamp: new Date().toISOString(),
        note: 'All access tokens and refresh tokens have been invalidated immediately.'
      };
    } catch (error) {
      // Handle JWT verification errors
      if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedError('Invalid access token');
      }
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedError('Access token has expired');
      }
      // Re-throw other errors (like database errors)
      throw error;
    }
  },

  toggleACRole: async (accessToken) => {
    if (!accessToken) {
      throw new UnauthorizedError('Access token required');
    }

    try {
      // Verify and decode the access token
      const decoded = jwt.verify(accessToken, JWT_SECRET);
      const userId = decoded.uid;

      // Find the user in the database
      const user = await Iam.findOne({ where: { iam_id: userId } });
      if (!user) {
        throw new NotFoundError('User not found');
      }

      // Verify user has AC role
      if (user.role !== 'AC') {
        throw new UnauthorizedError('Only Academic Coordinators can toggle roles');
      }

      // Find the academic coordinator record
      const academicCoordinator = await AcademicCoordinator.findOne({ 
        where: { ac_id: user.iam_id } 
      });

      if (!academicCoordinator) {
        throw new NotFoundError('Academic Coordinator record not found');
      }

      // Toggle the current_role
      const newRole = academicCoordinator.current_role === 'AC' ? 'LECTURER' : 'AC';
      
      // Update the current_role in the database
      await academicCoordinator.update({ current_role: newRole });

      // Blacklist the current access token
      tokenBlacklistService.blacklistToken(accessToken, decoded.exp * 1000);

      // Clear the refresh token to force re-authentication
      await user.update({ refresh_token: null });

      // Generate new tokens with the updated role
      const newAccessToken = jwt.sign(
        { uid: user.iam_id, 
          email: user.email, 
          role: newRole, 
          username: user.username},
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      const newRefreshToken = jwt.sign(
        { uid: user.iam_id },
        JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
      );

      // Store new refresh token in database
      await user.update({ refresh_token: newRefreshToken });

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        role: newRole,
        username: user.username,
        message: `Role toggled successfully to ${newRole}`,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      // Handle JWT verification errors
      if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedError('Invalid access token');
      }
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedError('Access token has expired');
      }
      // Re-throw other errors (like database errors)
      throw error;
    }
  },

  register: async (userData) => {
    const { username, email, password, role } = userData;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Iam.create({
      iam_id: uuidv4(),
      username,
      email,
      password: hashedPassword,
      role: role || 'student',
    });

    return {
      iam_id: newUser.iam_id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role
    };
  },

  // Utility method to get blacklist stats (for debugging/monitoring)
  getBlacklistStats: () => {
    return tokenBlacklistService.getStats();
  }
};

export default authService;
