import accountService from '../services/account.service.js';
import { responseSuccess, responseError } from '../common/helpers/response.helper.js';

const iamController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await accountService.getAllUsers();
      res.status(200).json(responseSuccess(users, 'Users retrieved successfully'));
    } catch (error) {
      res.status(500).json(responseError(error.message, 500));
    }
  },

  getUniqueRoles: async (req, res) => {
    try {
      const roles = await accountService.getUniqueRoles();
      res.status(200).json(responseSuccess(roles, 'Roles retrieved successfully'));
    } catch (error) {
      res.status(500).json(responseError(error.message, 500));
    }
  },

  getUserById: async (req, res) => {
    try {
      const { accId } = req.params;
      const user = await accountService.getUserById(accId);
      res.status(200).json(responseSuccess(user, 'User retrieved successfully'));
    } catch (error) {
      res.status(500).json(responseError(error.message, 500));
    }
  },

  createUser: async (req, res) => {
    try {
      const userData = req.body;
      const newUser = await accountService.createUser(userData);
      res.status(201).json(responseSuccess(newUser, 'User created successfully'));
    } catch (error) {
      res.status(500).json(responseError(error.message, 500));
    }
  },

  updateUser: async (req, res) => {
    try {
      const { accId } = req.params;
      const userData = req.body;
      const updatedUser = await accountService.updateUser(accId, userData);
      res.status(200).json(responseSuccess(updatedUser, 'User updated successfully'));
    } catch (error) {
      res.status(500).json(responseError(error.message, 500));
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { accId } = req.params;
      await accountService.deleteUser(accId);
      res.status(200).json(responseSuccess(null, 'User deleted successfully'));
    } catch (error) {
      res.status(500).json(responseError(error.message, 500));
    }
  },

  searchAccounts: async (req, res) => {
    try {
      const searchParams = {
        accId: req.query.accId,
        username: req.query.username,
        program: req.query.program,
        intake: req.query.intake,
        role: req.query.role
      };
      
      const accounts = await accountService.searchAccounts(searchParams);
      res.status(200).json(responseSuccess(accounts, 'Accounts retrieved successfully'));
    } catch (error) {
      res.status(500).json(responseError(error.message, 500));
    }
  }
};

export default iamController;
