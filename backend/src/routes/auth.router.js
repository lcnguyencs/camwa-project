import express from 'express';
import { loginUser, refreshToken, logOutUser, getCurrentUser } from '../controllers/authController.js';
import { verifyTokenAndRole } from '../middleware/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/login', loginUser);
authRouter.post('/refresh-token', refreshToken);
authRouter.post('/logout', verifyTokenAndRole(['ADMIN', 'FACULTY', 'LECTURER', 'STUDENT']), logOutUser);
authRouter.get('/me', verifyTokenAndRole(['ADMIN', 'FACULTY', 'LECTURER', 'STUDENT']), getCurrentUser);

export default authRouter; 