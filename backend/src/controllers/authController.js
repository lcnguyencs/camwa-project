import authService from '../services/auth.service.js';


// User Login Controller
export const loginUser = async (req, res) => {
  try {
    const result = await authService.login(req)
    // Send the JWT token and role back to the client
    return res.status(200).json(result);
  } catch (error) {
    // Handle errors (e.g., invalid token, user not found)
    return res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
};
