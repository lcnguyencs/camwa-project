import IntakeModule from '../models/IntakeModules.model.js';
import Program from '../models/Program.model.js';
import Semester from '../models/Semester.model.js';
import Lecturer from '../models/Lecturer.model.js';
import StudentIntakeModule from '../models/StudentIntakeModule.model.js';
import sequelize from '../common/sequelize/connect.sequelize.js';
import { Op } from 'sequelize';

const intakeModuleService = {
  getAllIntakeModules: async (filteredActive) => {
    try {
      if (filteredActive) {
        const currentYear = parseInt(new Date().getFullYear());
        const fourYearsAgo = currentYear - 4;
        
        const activeModules = await IntakeModule.findAll({
          where: {
            intake: {
              [Op.between]: [parseInt(fourYearsAgo), parseInt(currentYear)]
            }
          }
        });
        return activeModules;
      }

      const allModules = await IntakeModule.findAll();
      return allModules;
      
    } catch (error) {
      throw new Error('Error retrieving intake modules: ' + error.message);
    }
  },

  getModuleDetails: async (moduleId) => {
    try {
      const moduleDetails = await IntakeModule.findOne({
        where: {
          intake_module_id: moduleId
        },
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
              '(SELECT COUNT(*) FROM student_intake_module WHERE student_intake_module.intake_module_id = IntakeModule.intake_module_id)'
            ),
            'student_count'
          ]
        ]
      });

      if (!moduleDetails) {
        throw new Error('Module not found');
      }

      return {
        moduleId: moduleDetails.intake_module_id,
        moduleName: moduleDetails.name,
        programName: moduleDetails.Program.name,
        semesterId: moduleDetails.Semester.sem_id,
        intakeYear: moduleDetails.intake,
        lecturerName: moduleDetails.Lecturer.name,
        studentCount: moduleDetails.dataValues.student_count
      };

    } catch (error) {
      throw new Error('Error retrieving module details: ' + error.message);
    }
  }
};

export default intakeModuleService;
