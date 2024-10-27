import authService from '../services/auth.service.js';
import { responseError, responseSuccess } from '../common/helpers/response.helper.js';

// User Login Controller
export const loginUser = async (req, res) => {
  try {
    const result = await authService.login(req);
    const resData = responseSuccess(result, 'User authenticated successfully');
    return res.status(resData.code).json(resData);
  } catch (error) {
    const resError = responseError(error, 'Authentication failed');
    return res.status(resError.code).json(resError);
  }
};

// Controller for refreshing the access token
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token required' });
    }

    const tokens = await authService.refreshAccessToken(refreshToken);
    res.status(200).json(tokens);
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
};

export const logOutUser = async (req, res) => {
  try {
    const result = await authService.logOut();
    res.status(200).json(result); 
  } catch (error) {
    res.status(500).json({ message: 'Error logging out user' });
  }
};

// Controller for creating a new user
export const createUser = async (req, res) => {
  try {
    const newUser = await authService.createUser(req.body);
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};
