import intakeModuleService from '../services/intakeModule.service.js';
import { responseSuccess, responseError } from '../common/helpers/response.helper.js';

const intakeModuleController = {
  getAllIntakeModules: async (req, res) => {
    try {
      const { filteredActive } = req.query;
      const modules = await intakeModuleService.getAllIntakeModules(filteredActive === 'true');
      res.status(200).json(responseSuccess(modules, 'Intake modules retrieved successfully'));
    } catch (error) {
      res.status(500).json(responseError(error.message, 500));
    }
  }
};

export default intakeModuleController;
