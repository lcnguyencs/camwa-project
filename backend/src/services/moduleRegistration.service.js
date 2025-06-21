import ModuleRegistration from '../models/ModuleRegistration.model.js';
import Student from '../models/Student.model.js';
import Module from '../models/Module.model.js';
import Semester from '../models/Semester.model.js';
import Program from '../models/Program.model.js';
import Lecturer from '../models/Lecturer.model.js';
import sequelize from '../common/sequelize/connect.sequelize.js';

const moduleRegistrationService = {
  // Create a new module registration
  createRegistration: async (registrationData) => {
    try {
      const newRegistration = await ModuleRegistration.create(registrationData);
      return newRegistration;
    } catch (error) {
      throw new Error('Error creating module registration: ' + error.message);
    }
  },
  // Get all registrations
  getAllRegistrations: async () => {
    try {
      const registrations = await ModuleRegistration.findAll({
        include: [
          { model: Student, attributes: ['student_id', 'name'] },
          { 
            model: Module, 
            attributes: ['module_id', 'name', 'semester_id', 'program_id'],
            include: [
              { model: Semester, attributes: ['sem_id', 'start_date', 'end_date'] },
              { model: Program, attributes: ['program_id', 'name'] }
            ]
          },
          { model: Lecturer, attributes: ['lecturer_id', 'name'] }
        ],
        order: [['created_at', 'DESC']]
      });
      return registrations;
    } catch (error) {
      throw new Error('Error retrieving module registrations: ' + error.message);
    }
  },
  // Find registration by ID
  findRegistrationById: async (module_reg_id) => {
    try {
      const registration = await ModuleRegistration.findOne({
        where: { module_reg_id },
        include: [
          { model: Student, attributes: ['student_id', 'name'] },
          { 
            model: Module, 
            attributes: ['module_id', 'name', 'semester_id', 'program_id'],
            include: [
              { model: Semester, attributes: ['sem_id', 'start_date', 'end_date'] },
              { model: Program, attributes: ['program_id', 'name'] }
            ]
          },
          { model: Lecturer, attributes: ['lecturer_id', 'name'] }
        ]
      });
      
      if (!registration) {
        throw new Error('Module registration not found');
      }
      
      return registration;
    } catch (error) {
      throw new Error('Error finding module registration: ' + error.message);
    }
  },  // Find registrations by student ID
  findRegistrationsByStudentId: async (student_id) => {
    try {
      const registrations = await ModuleRegistration.findAll({
        where: { student_id },
        include: [
          { 
            model: Module, 
            attributes: ['module_id', 'name', 'semester_id', 'program_id'], 
          }
        ],
        order: [['created_at', 'DESC']]      
      });
      
      return registrations;
    } catch (error) {
      throw new Error('Error finding student registrations: ' + error.message);
    }
  },
  // Find registrations by module ID
  findRegistrationsByModuleId: async (module_id) => {
    try {
      const registrations = await ModuleRegistration.findAll({
        where: { module_id },
        include: [
          { model: Student, attributes: ['student_id', 'name'] },
          { 
            model: Module, 
            attributes: ['module_id', 'name', 'semester_id', 'program_id'],
            include: [
              { model: Semester, attributes: ['sem_id', 'start_date', 'end_date'] },
              { model: Program, attributes: ['program_id', 'name'] }
            ]
          },
          { model: Lecturer, attributes: ['lecturer_id', 'name'] }
        ],
        order: [['created_at', 'DESC']]
      });
      
      return registrations;
    } catch (error) {
      throw new Error('Error finding module registrations: ' + error.message);
    }
  },  // Get lecturer's modules with student counts
  getLecturerModulesWithStudentCount: async (lecturer_id) => {
    try {
      const registrations = await ModuleRegistration.findAll({
        where: { lecturer_id },
        attributes: [
          'module_id',
          [sequelize.fn('COUNT', sequelize.col('ModuleRegistration.student_id')), 'student_count']
        ],
        include: [
          { 
            model: Module, 
            attributes: ['module_id', 'name', 'semester_id', 'program_id'],
          }
        ],
        group: [
          'ModuleRegistration.module_id', 
          'Module.module_id',
          'Module.name',
          'Module.semester_id', 
          'Module.program_id'
        ],
        order: [[{ model: Module }, 'name', 'ASC']]
      });
      
      return registrations;
    } catch (error) {
      throw new Error('Error finding lecturer modules with student count: ' + error.message);
    }
  },

  // Update a registration
  updateRegistration: async (module_reg_id, updatedData) => {
    try {
      const [updated] = await ModuleRegistration.update(updatedData, {
        where: { module_reg_id }
      });
      
      if (updated === 0) {
        throw new Error('Module registration not found or no changes made');
      }
        const updatedRegistration = await ModuleRegistration.findOne({
        where: { module_reg_id },
        include: [
          { model: Student, attributes: ['student_id', 'name'] },
          { 
            model: Module, 
            attributes: ['module_id', 'name', 'semester_id', 'program_id'],
            include: [
              { model: Semester, attributes: ['sem_id', 'start_date', 'end_date'] },
              { model: Program, attributes: ['program_id', 'name'] }
            ]
          },
          { model: Lecturer, attributes: ['lecturer_id', 'name'] }
        ]
      });
      
      return updatedRegistration;
    } catch (error) {
      throw new Error('Error updating module registration: ' + error.message);
    }
  },

  // Delete a registration
  deleteRegistration: async (module_reg_id) => {
    try {
      const deleted = await ModuleRegistration.destroy({
        where: { module_reg_id }
      });
      
      if (deleted === 0) {
        throw new Error('Module registration not found');
      }
      
      return { message: 'Module registration deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting module registration: ' + error.message);
    }
  },
  // Create multiple module registrations from CSV file
  createRegistrationsFromCSV: async (filePath) => {
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
        // Map CSV columns based on the format: StudentID,Email,Intake,Program,Name,moduleId,ModuleName,lecturer,semester
        const student_id = row.getCell(1).value?.toString(); // StudentID
        const module_id = row.getCell(6).value?.toString(); // moduleId
        const lecturer_id = row.getCell(8).value?.toString(); // lecturer
        
        // Skip empty rows or rows with missing required fields
        if (!student_id || !module_id || !lecturer_id) {
          console.log(`Skipping row ${i} due to missing required fields`);
          results.failed.push({
            row: i,
            error: 'Missing required fields (student_id, module_id, lecturer_id)'
          });
          continue;
        }
        
        try {
          // Verify that the module exists and get its details
          const moduleExists = await Module.findOne({
            where: { module_id },
            include: [
              { model: Semester, attributes: ['sem_id', 'start_date', 'end_date'] },
              { model: Program, attributes: ['program_id', 'name'] }
            ]
          });
          
          if (!moduleExists) {
            results.failed.push({
              student_id,
              module_id,
              error: 'Module not found'
            });
            continue;
          }
          
          // Create registration record with only the required fields
          const registrationData = {
            student_id,
            module_id,
            lecturer_id
          };
          
          // Check if registration already exists
          const existingRegistration = await ModuleRegistration.findOne({
            where: {
              student_id,
              module_id
            }
          });
          
          if (existingRegistration) {
            results.failed.push({
              student_id,
              module_id,
              error: 'Registration already exists'
            });
            continue;
          }
          
          // Use the existing createRegistration method
          const newRegistration = await moduleRegistrationService.createRegistration(registrationData);
          
          results.successful.push({
            module_reg_id: newRegistration.module_reg_id,
            student_id: newRegistration.student_id,
            module_id: newRegistration.module_id,
            lecturer_id: newRegistration.lecturer_id
          });
        } catch (error) {
          console.error(`Error creating registration at row ${i}:`, error);
          results.failed.push({
            student_id,
            module_id,
            error: error.message
          });
        }
      }
      
      return results;
    } catch (error) {
      console.error('Error creating registrations from CSV:', error);
      throw new Error('Error creating registrations from CSV: ' + error.message);
    }
  }
};

export default moduleRegistrationService;
