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

  getUserById: async (req, res) => {
    try {
      const { iamId } = req.params;
      const user = await accountService.getUserById(iamId);
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
      const { iamId } = req.params;
      const userData = req.body;
      const updatedUser = await accountService.updateUser(iamId, userData);
      res.status(200).json(responseSuccess(updatedUser, 'User updated successfully'));
    } catch (error) {
      res.status(500).json(responseError(error.message, 500));
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { iamId } = req.params;
      await accountService.deleteUser(iamId);
      res.status(200).json(responseSuccess(null, 'User deleted successfully'));
    } catch (error) {
      res.status(500).json(responseError(error.message, 500));
    }
  },
  createStudentsFromExcel: async (req, res) => {
    try {
      // Check if file was uploaded
      if (!req.file) {
        return res.status(400).json(responseError('No Excel file uploaded. Make sure to include a file field with your XLSX file.', 400));
      }

      console.log('File uploaded:', req.file);
      console.log('File path:', req.file.path);
      
      // Process the Excel file and create students using the uploaded file path
      const results = await accountService.createMultipleStudentsFromExcel(req.file.path);
      
      res.status(201).json(
        responseSuccess(
          results, 
          `Created ${results.successful.length} student accounts successfully. ${results.failed.length} failed.`
        )
      );
    } catch (error) {
      console.error('Error processing Excel file:', error);
      res.status(500).json(responseError(error.message, 500));
    }
  },
  createLecturersFromExcel: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          status: 'error',
          code: 400,
          message: 'No Excel file provided'
        });
      }

      const results = await accountService.createMultipleLecturersFromExcel(req.file.path);
      
      return res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Lecturers creation process completed',
        data: {
          successful: results.successful.length,
          failed: results.failed.length,
          details: results
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        code: 500,
        message: error.message
      });
    }
  }
};

export default iamController;
