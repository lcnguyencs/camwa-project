import Module from '../models/Module.model.js';
import Lecturer from '../models/Lecturer.model.js';
import Student from '../models/Student.model.js';
import Attendance from '../models/Attendance.model.js';
import auditLogService from '../services/auditLogService.js';
import { sendMail } from '../common/nodemailer/send-mail.nodemailer.js';

const moduleService = {
    // Create a new module (Admin only)
    createModule: async (moduleData, userId) => {
        const module = await Module.create(moduleData);
        await auditLogService.logAction(userId, 'createModule', module);
        return module;
    },    // View all modules (Admin/Faculty Assistant)
    viewModules: async () => {
        return await Module.findAll();
    },

    checkModuleExists: async (moduleName, lecturerId) => {
    try {
        const existingModule = await Module.findOne({
            where: {
                name: moduleName,
                lecturer_id: lecturerId
            }
        });
        
        return !!existingModule; // Returns true if module exists, false otherwise
    } catch (error) {
        console.error("Error checking module existence:", error);
        throw error;
        }    },

    
    // Update a module by module_id (Admin/Faculty Assistant)
    updateModule: async (moduleId, updatedData, userId) => {
        const [affectedCount] = await Module.update(updatedData, { where: { module_id: moduleId } });  // Update module in the database
        if (affectedCount === 0) {
            throw new Error('Module not found or no changes made');  // Handle case where module was not found or no changes were made
        }
        await auditLogService.logAction(userId, 'updateModule', { moduleId, updatedData });  // Log the update action with userId
        return await Module.findByPk(moduleId);  // Return the updated module object
    },

    // Delete a module by module_id (Admin only)
    deleteModule: async (moduleId, userId) => {
        const affectedRows = await Module.destroy({ where: { module_id: moduleId } });  // Delete module from the database
        if (affectedRows === 0) {
            throw new Error('Module not found');  // Handle case where module was not found
        }
        await auditLogService.logAction(userId, 'deleteModule', { moduleId });  // Log the deletion action with userId
        return { message: 'Module successfully deleted' };  // Return success message
    },

    // Create multiple modules from CSV file (Admin only)
    createMultipleModulesFromCSV: async (filePath, userId) => {
        try {
            const fs = await import('fs/promises');
            
            // Check if file exists before attempting to read
            try {
                await fs.access(filePath);
                console.log(`CSV file exists at: ${filePath}`);
            } catch (fileError) {
                throw new Error(`File not found: ${filePath}`);
            }
            
            const Excel = (await import('exceljs')).default;
            const workbook = new Excel.Workbook();
            
            console.log(`Attempting to read CSV from: ${filePath}`);
            
            // Parse the CSV file
            await workbook.csv.readFile(filePath);
            const worksheet = workbook.worksheets[0];
            
            console.log(`CSV loaded successfully with ${worksheet.rowCount} rows`);
            
            const results = {
                successful: [],
                failed: []
            };
            
            // Skip the header row and process each row
            for (let i = 2; i <= worksheet.rowCount; i++) {
                const row = worksheet.getRow(i);
                const moduleId = row.getCell(1).value?.toString();
                const name = row.getCell(2).value?.toString();
                const lecturerId = row.getCell(3).value?.toString();
                const programId = row.getCell(4).value?.toString();
                const intake = row.getCell(5).value?.toString();
                const semesterId = row.getCell(6).value?.toString();
                
                // Skip empty rows or rows with missing required fields
                if (!moduleId || !name || !lecturerId || !programId || !intake || !semesterId) {
                    console.log(`Skipping row ${i} due to missing required fields`);
                    continue;
                }
                
                try {
                    // Check if module with same name and lecturer already exists
                    const moduleExists = await moduleService.checkModuleExists(name, lecturerId);
                    if (moduleExists) {
                        results.failed.push({
                            moduleId,
                            name,
                            lecturerId,
                            error: 'Module with this name and lecturer already exists'
                        });
                        continue;
                    }
                    
                    // Create module record
                    const moduleData = {
                        module_id: moduleId,
                        name: name,
                        lecturer_id: lecturerId,
                        program_id: programId,
                        intake: parseInt(intake),
                        semester_id: semesterId
                    };
                    
                    // Use the existing createModule method
                    const newModule = await moduleService.createModule(moduleData, userId);
                    
                    results.successful.push({
                        moduleId: newModule.module_id,
                        name: newModule.name,
                        lecturerId: newModule.lecturer_id,
                        programId: newModule.program_id,
                        intake: newModule.intake,
                        semesterId: newModule.semester_id
                    });
                } catch (error) {
                    console.error(`Error creating module at row ${i}:`, error);
                    results.failed.push({
                        moduleId,
                        name,
                        lecturerId,
                        error: error.message
                    });
                }
            }
            
            // Log the bulk creation action
            await auditLogService.logAction(
                userId, 
                'bulkCreateModules', 
                { 
                    successCount: results.successful.length, 
                    failCount: results.failed.length 
                }
            );
            
            return results;
        } catch (error) {
            console.error('Error creating modules from CSV:', error);
            throw new Error('Error creating modules from CSV: ' + error.message);
        }
    },

    // Delete multiple modules from CSV file (Admin only)
    deleteMultipleModulesFromCSV: async (filePath, userId) => {
        try {
            const fs = await import('fs/promises');
            
            // Check if file exists before attempting to read
            try {
                await fs.access(filePath);
                console.log(`CSV file exists at: ${filePath}`);
            } catch (fileError) {
                throw new Error(`File not found: ${filePath}`);
            }
            
            const Excel = (await import('exceljs')).default;
            const workbook = new Excel.Workbook();
            
            console.log(`Attempting to read CSV from: ${filePath}`);
            
            // Parse the CSV file
            await workbook.csv.readFile(filePath);
            const worksheet = workbook.worksheets[0];
            
            console.log(`CSV loaded successfully with ${worksheet.rowCount} rows`);
            
            const results = {
                successful: [],
                failed: []
            };
            
            // Skip the header row and process each row
            for (let i = 2; i <= worksheet.rowCount; i++) {
                const row = worksheet.getRow(i);
                const name = row.getCell(1).value?.toString();
                const lecturerId = row.getCell(2).value?.toString();
                const programId = row.getCell(3).value?.toString();
                const intake = row.getCell(4).value?.toString();
                const semesterId = row.getCell(5).value?.toString();
                
                // Skip empty rows or rows with missing critical identifiers
                if (!name || !lecturerId) {
                    console.log(`Skipping row ${i} due to missing name or lecturer_id`);
                    continue;
                }
                
                try {
                    // Find modules that match the criteria
                    const whereClause = {
                        name: name,
                        lecturer_id: lecturerId
                    };
                    
                    // Add optional filters if provided
                    if (programId) whereClause.program_id = programId;
                    if (intake) whereClause.intake = parseInt(intake);
                    if (semesterId) whereClause.semester_id = semesterId;
                    
                    // Find modules to delete first (to include in results)
                    const modulesToDelete = await Module.findAll({ where: whereClause });
                    
                    if (modulesToDelete.length === 0) {
                        results.failed.push({
                            name,
                            lecturerId,
                            programId,
                            intake,
                            semesterId,
                            error: 'No matching modules found'
                        });
                        continue;
                    }
                    
                    // Delete the modules
                    const deleteCount = await Module.destroy({ where: whereClause });
                    
                    // Record successful deletions
                    modulesToDelete.forEach(module => {
                        results.successful.push({
                            moduleId: module.module_id,
                            name: module.name,
                            lecturerId: module.lecturer_id,
                            programId: module.program_id,
                            intake: module.intake,
                            semesterId: module.semester_id
                        });
                    });
                    
                    // Log each deletion
                    await auditLogService.logAction(userId, 'deleteModuleFromCSV', { 
                        criteria: whereClause, 
                        count: deleteCount 
                    });
                    
                } catch (error) {
                    console.error(`Error deleting module at row ${i}:`, error);
                    results.failed.push({
                        name,
                        lecturerId,
                        programId,
                        intake,
                        semesterId,
                        error: error.message
                    });
                }
            }
            
            // Log the bulk deletion action
            await auditLogService.logAction(
                userId, 
                'bulkDeleteModules', 
                { 
                    successCount: results.successful.length, 
                    failCount: results.failed.length 
                }
            );
            
            return results;
        } catch (error) {
            console.error('Error deleting modules from CSV:', error);
            throw new Error('Error deleting modules from CSV: ' + error.message);
        }
    }
};

export default moduleService;