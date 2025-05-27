import IntakeModules from '../models/IntakeModules.model.js';
import Program from '../models/Program.model.js';
import Semester from '../models/Semester.model.js';
import Lecturer from '../models/Lecturer.model.js';
import StudentIntakeModule from '../models/StudentIntakeModule.model.js';
import Student from '../models/Student.model.js';
import sequelize from '../common/sequelize/connect.sequelize.js';
import { Op } from 'sequelize';

const intakeModuleService = {
  getAllIntakeModules: async (filteredActive) => {
    try {
      let whereClause = {};
      if (filteredActive) {
        const currentYear = parseInt(new Date().getFullYear());
        const fourYearsAgo = currentYear - 4;
        whereClause = {
          intake: {
            [Op.between]: [parseInt(fourYearsAgo), parseInt(currentYear)]
          }
        };
      }
  
      const modules = await IntakeModules.findAll({
        where: whereClause,
        include: [
          {
            model: Program,
            attributes: ['name'],
          },
          {
            model: Semester,
            attributes: ['sem_id'],
          },
          {
            model: Lecturer,
            attributes: ['name'],
          }
        ],
        attributes: [
          'intake_module_id',
          'name',
          'intake',
          [
            sequelize.literal(
              '(SELECT COUNT(*) FROM student_intake_module WHERE student_intake_module.intake_module_id = "IntakeModule".intake_module_id)'
            ),
            'student_count'
          ]
        ]
      });
  
      return modules.map(module => ({
        moduleId: module.intake_module_id,
        moduleName: module.name,
        programName: module.Program.name,
        semesterId: module.Semester.sem_id,
        intakeYear: module.intake,
        lecturerName: module.Lecturer.name,
        studentCount: module.dataValues.student_count
      }));
  
    } catch (error) {
      throw new Error('Error retrieving intake modules: ' + error.message);
    }
  },

  getModuleDetails: async (moduleId) => {
    try {
      const moduleDetails = await IntakeModules.findOne({
        where: {
          intake_module_id: moduleId
        },
        include: [
          {
            model: Program,
            attributes: ['program_id', 'name'],
          },
          {
            model: Semester,
            attributes: ['sem_id'],
          },
          {
            model: Lecturer,
            attributes: ['staff_id', 'name'],
          }
        ],
        attributes: [
          'intake_module_id',
          'name',
          'capacity',
          'ects',
          'course_id',
          'intake',
          'lecturer_id',
          'program_id',
          'semester_id'
        ]
      });

      if (!moduleDetails) {
        throw new Error('Module not found');
      }

      return {
        moduleId: moduleDetails.intake_module_id,
        moduleName: moduleDetails.name,
        capacity: moduleDetails.capacity,
        ects: moduleDetails.ects,
        courseId: moduleDetails.course_id,
        intake: moduleDetails.intake,
        lecturerId: moduleDetails.lecturer_id,
        lecturerName: moduleDetails.Lecturer.name,
        programId: moduleDetails.program_id,
        programName: moduleDetails.Program.name,
        semesterId: moduleDetails.semester_id
      };

    } catch (error) {
      throw new Error('Error retrieving module details: ' + error.message);
    }
  },

  createIntakeModule: async (moduleData) => {
    try {
      const newModule = await IntakeModules.create({
        intake_module_id: moduleData.moduleId,
        name: moduleData.name,
        capacity: moduleData.capacity,
        ects: moduleData.ects,
        lecturer_id: moduleData.lecturerId,
        program_id: moduleData.programId,
        course_id: moduleData.courseId,
        intake: moduleData.intake,
        semester_id: moduleData.semesterId
      });
  
      return await intakeModuleService.getModuleDetails(newModule.intake_module_id);
    } catch (error) {
      throw new Error('Error creating intake module: ' + error.message);
    }
  },
  
  deleteIntakeModule: async (moduleId) => {
    try {
      const result = await IntakeModules.destroy({
        where: {
          intake_module_id: moduleId
        }
      });
  
      if (!result) {
        throw new Error('Module not found');
      }
    } catch (error) {
      throw new Error('Error deleting intake module: ' + error.message);
    }
  },
  
  updateIntakeModule: async (moduleId, moduleData) => {
    try {
      const [updated] = await IntakeModules.update({
        name: moduleData.name,
        capacity: moduleData.capacity,
        ects: moduleData.ects,
        lecturer_id: moduleData.lecturerId,
        program_id: moduleData.programId,
        course_id: moduleData.courseId,
        intake: moduleData.intake,
        semester_id: moduleData.semesterId
      }, {
        where: {
          intake_module_id: moduleId
        }
      });
  
      if (!updated) {
        throw new Error('Module not found');
      }
  
      return await intakeModuleService.getModuleDetails(moduleId);
    } catch (error) {
      throw new Error('Error updating intake module: ' + error.message);
    }
  },

  getModuleStudents: async (moduleId) => {
    try {
      const students = await StudentIntakeModule.findAll({
        where: {
          intake_module_id: moduleId
        },
        include: [{
          model: Student,
          attributes: [
            'student_id',
            'name',
            'map_location',
            'program_id',
            'intake'
          ]
        }],
        attributes: ['enrollment_date']
      });
    
      return students.map(enrollment => ({
        studentId: enrollment.Student.student_id,
        name: enrollment.Student.name,
        mapLocation: enrollment.Student.map_location,
        intakeYear: enrollment.Student.intake,
        programId: enrollment.Student.program_id,
        enrollmentDate: enrollment.enrollment_date
      }));
    } catch (error) {
      throw new Error('Error retrieving module students: ' + error.message);
    }
  },

  searchModules: async (searchParams) => {
    try {
      const { name, program, semester, intake, lecturer } = searchParams;
      
      const whereClause = {};
      const includeClause = [
        {
          model: Program,
          attributes: ['name'],
          required: false
        },
        {
          model: Semester,
          attributes: ['sem_id'],
          required: false
        },
        {
          model: Lecturer,
          attributes: ['name'],
          required: false
        }
      ];

      if (name) {
        whereClause.name = { [Op.like]: `%${name}%` };
      }
      
      if (program) {
        includeClause[0].where = { name: { [Op.like]: `%${program}%` } };
        includeClause[0].required = true;
      }
      
      if (semester) {
        includeClause[1].where = { sem_id: { [Op.like]: `%${semester}%` } };
        includeClause[1].required = true;
      }
      
      if (lecturer) {
        includeClause[2].where = { name: { [Op.like]: `%${lecturer}%` } };
        includeClause[2].required = true;
      }
      
      if (intake) {
        whereClause.intake = parseInt(intake) || intake;
      }

      const modules = await IntakeModules.findAll({
        where: whereClause,
        include: includeClause,
        attributes: [
          'intake_module_id',
          'name',
          'intake',
          [
            sequelize.literal(
              '(SELECT COUNT(*) FROM student_intake_module WHERE student_intake_module.intake_module_id = "IntakeModule".intake_module_id)'
            ),
            'student_count'
          ]
        ]
      });

      return modules.map(module => ({
        moduleId: module.intake_module_id,
        moduleName: module.name,
        programName: module.Program?.name || 'N/A',
        semesterId: module.Semester?.sem_id || 'N/A',
        intakeYear: module.intake,
        lecturerName: module.Lecturer?.name || 'N/A',
        studentCount: module.dataValues.student_count || 0
      }));

    } catch (error) {
      console.error('Search error:', error);
      throw new Error('Error searching modules: ' + error.message);
    }
  },

  generateNextModuleId: async () => {
    try {
      // Test database connection first
      try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw new Error('Database connection failed');
      }

      // Check if the table exists
      try {
        await sequelize.query('SELECT 1 FROM intake_module LIMIT 1');
        console.log('Table intake_module exists and is accessible.');
      } catch (error) {
        console.error('Error accessing intake_module table:', error);
        throw new Error('Table intake_module not found or not accessible');
      }

      // Get all module IDs
      const result = await sequelize.query(
        'SELECT intake_module_id FROM intake_module WHERE intake_module_id LIKE :pattern ORDER BY intake_module_id DESC LIMIT 1',
        {
          replacements: { pattern: 'IM%' },
          type: sequelize.QueryTypes.SELECT
        }
      );

      console.log('Database query result:', result);  // Debug log

      if (!result || result.length === 0) {
        console.log('No existing modules found, returning IM001');  // Debug log
        return 'IM001'; // First module
      }

      const lastId = result[0].intake_module_id;
      console.log('Last ID found:', lastId);  // Debug log

      if (!lastId || typeof lastId !== 'string') {
        console.log('Invalid last ID, returning IM001');
        return 'IM001';
      }

      // Extract the number part using regex
      const matches = lastId.match(/IM(\d+)/);
      if (!matches || matches.length < 2) {
        console.log('Failed to extract number from ID, returning IM001');
        return 'IM001';
      }

      const numberPart = parseInt(matches[1]);
      console.log('Extracted number:', numberPart);  // Debug log
      
      if (isNaN(numberPart)) {
        console.log('Failed to parse number, returning IM001');
        return 'IM001';
      }

      const nextNumber = numberPart + 1;
      if (nextNumber > 999) {
        throw new Error('Module ID limit reached');
      }

      const nextId = `IM${String(nextNumber).padStart(3, '0')}`;
      console.log('Generated next ID:', nextId);  // Debug log
      return nextId;
    } catch (error) {
      console.error('Error in generateNextModuleId:', error);  // Detailed error logging
      throw new Error(`Failed to generate next module ID: ${error.message}`);
    }
  },

  getStudentModules: async (studentId) => {
    try {
      console.log('Getting modules for student:', studentId);
      
      // First, find the student
      const student = await Student.findByPk(studentId);
      if (!student) {
        throw new Error('Student not found');
      }

      // Then get their modules through the join table
      const studentModules = await StudentIntakeModule.findAll({
        where: { student_id: studentId },
        include: [
          {
            model: IntakeModules,
            include: [
              {
                model: Semester,
                attributes: ['sem_id']
              },
              {
                model: Lecturer,
                attributes: ['name']
              }
            ]
          }
        ]
      });

      console.log('Found student modules:', studentModules);

      const mappedModules = studentModules.map(enrollment => ({
        moduleId: enrollment.IntakeModule.intake_module_id,
        moduleName: enrollment.IntakeModule.name,
        semesterId: enrollment.IntakeModule.Semester?.sem_id || '',
        lecturerName: enrollment.IntakeModule.Lecturer?.name || '',
        enrollmentDate: enrollment.enrollment_date
      }));

      console.log('Mapped modules:', mappedModules);
      return mappedModules;
    } catch (error) {
      console.error('Error in getStudentModules:', error);
      throw new Error('Error retrieving student modules: ' + error.message);
    }
  },
};

export default intakeModuleService;
