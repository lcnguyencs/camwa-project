import intakeService from '../services/intake.service.js';
import { responseSuccess, responseError } from '../common/helpers/response.helper.js';

const intakeController = {
    getAllIntakes: async (req, res) => {
        try {
            const intakes = await intakeService.getAllIntakes();
            res.status(200).json(responseSuccess(intakes, 'Intakes retrieved successfully'));
        } catch (error) {
            res.status(500).json(responseError(error.message, 500));
        }
    }
};

export default intakeController; 