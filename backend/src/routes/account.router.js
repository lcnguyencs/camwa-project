import express from 'express';
import iamController from '../controllers/accountManagement.controller.js';
import { verifyTokenAndRole } from '../middleware/authMiddleware.js';

const accountRouter = express.Router();

// Get all users
accountRouter.get('/', verifyTokenAndRole(['ADMIN']), iamController.getAllUsers);

// Get unique roles
accountRouter.get('/roles', iamController.getUniqueRoles);

// Search accounts
accountRouter.get('/search', iamController.searchAccounts);

accountRouter.get('/:accId', iamController.getUserById);
accountRouter.post('/', iamController.createUser);
accountRouter.put('/:accId', iamController.updateUser);
accountRouter.delete('/:accId', iamController.deleteUser);

export default accountRouter;
