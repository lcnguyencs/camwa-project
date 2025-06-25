import moduleService from '../services/module.service.js';
import { responseSuccess, responseError } from '../common/helpers/response.helper.js';
import ExcelJS from 'exceljs';

const moduleManagement = {
    // Create Module (Admin only)
    createModule: async (req, res, next) => {
        try {
            const moduleData = req.body;
            const userId = req.user.uid;
            const moduleExists = await moduleService.checkModuleExists(
                moduleData.name, 
                moduleData.lecturer_id
            );
            
            if (moduleExists) {
                throw new Error('Module already exists with this name and lecturer');
            }
            const result = await moduleService.createModule(moduleData, userId);
            const resData = responseSuccess(result, 'Module created successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            console.error("Failed to create module:", error);
            const resError = responseError(error, 'Failed to create module');
            res.status(resError.code).json(resError);
        }
    },

    // View Modules (List all modules, for Admin/Faculty Assistant)
    viewModules: async (req, res, next) => {
        try {
            const result = await moduleService.viewModules();
            const resData = responseSuccess(result, 'Modules retrieved successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            const resError = responseError(error);
            res.status(resError.code).json(resError);
        }
    },    

        // Update Module (Admin/Faculty Assistant)
    updateModule: async (req, res, next) => {
        try {
            const moduleId = req.params.moduleId;
            const updatedData = req.body;
            const userId = req.user.uid;
            const result = await moduleService.updateModule(moduleId, updatedData, userId);
            const resData = responseSuccess(result, 'Module updated successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            console.error("Failed to update module:", error);
            const resError = responseError(error);
            res.status(resError.code).json(resError);
        }
    },    

    // Delete Module (Admin only)
    deleteModule: async (req, res, next) => {
        try {
            const moduleId = req.params.moduleId;
            const userId = req.user.uid;
            const result = await moduleService.deleteModule(moduleId, userId);
            const resData = responseSuccess(result, 'Module deleted successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            console.error("Failed to delete module:", error);
            const resError = responseError(error);
            res.status(resError.code).json(resError);
        }
    },


    // Create modules from CSV file (Admin only)
    createModulesFromCSV: async (req, res) => {
        try {
            // Check if a file was uploaded
            if (!req.file) {
                return res.status(400).json({
                    status: 'error',
                    code: 400,
                    message: 'No CSV file uploaded'
                });
            }
            
            const userId = req.user.uid;
            const filePath = req.file.path;
            
            // Process the CSV file
            const result = await moduleService.createMultipleModulesFromCSV(filePath, userId);
            
            const resData = responseSuccess(result, 'Modules created from CSV successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            console.error("Failed to create modules from CSV:", error);
            const resError = responseError(error, 'Failed to process CSV file');
            res.status(resError.code).json(resError);
        }
    },

    // Delete modules from CSV file (Admin only)
    deleteModulesFromCSV: async (req, res) => {
        try {
            // Check if a file was uploaded
            if (!req.file) {
                return res.status(400).json({
                    status: 'error',
                    code: 400,
                    message: 'No CSV file uploaded'
                });
            }
            
            const userId = req.user.uid;
            const filePath = req.file.path;
            
            // Process the CSV file
            const result = await moduleService.deleteMultipleModulesFromCSV(filePath, userId);
            
            const resData = responseSuccess(result, 'Modules deleted from CSV successfully');
            res.status(resData.code).json(resData);
        } catch (error) {
            console.error("Failed to delete modules from CSV:", error);
            const resError = responseError(error, 'Failed to process CSV file');
            res.status(resError.code).json(resError);
        }
    }
};

export default moduleManagement;
