import Intake from '../models/Intake.model.js';

const intakeService = {
    getAllIntakes: async () => {
        try {
            const intakes = await Intake.findAll({
                order: [['year', 'DESC']]
            });
            return intakes.map(intake => intake.year);
        } catch (error) {
            throw new Error('Error retrieving intakes: ' + error.message);
        }
    }
};

export default intakeService; 