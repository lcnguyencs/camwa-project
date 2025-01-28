import IntakeModule from '../models/IntakeModules.model.js';
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
  }
};

export default intakeModuleService;
