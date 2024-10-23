import authService from '../services/auth.service.js';
import { responseError, responseSuccess } from '../common/helpers/response.helper.js';


// User Login Controller
export const loginUser = async (req, res) => {
  try {
    const result = await authService.login(req)
    // Send the JWT token and role back to the client
    const resData = responseSuccess(result, 'User authenticated successfully');
    return res.status(resData.code).json(resData);
  } catch (error) {
    // Handle errors (e.g., invalid token, user not found)
    const resError = responseError(error, 'Authentication failed');
    return res.status(resError.code).json(resError);
  }
};
