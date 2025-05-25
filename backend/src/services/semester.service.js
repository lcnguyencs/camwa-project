import Semester from '../models/Semester.model.js';

const semesterService = {
  getAllSemesters: async () => {
    try {
      const semesters = await Semester.findAll({
        attributes: [
          'sem_id',
          ['sem_type', 'name'], // Map sem_type to name for frontend compatibility
          'start_date',
          'end_date'
        ]
      });
      return semesters;
    } catch (error) {
      throw new Error('Error retrieving semesters: ' + error.message);
    }
  },

  findSemesterById: async (sem_id) => {
    try {
      const semester = await Semester.findOne({
        where: { sem_id },
        attributes: [
          'sem_id',
          ['sem_type', 'name'],
          'start_date',
          'end_date'
        ]
      });
      if (!semester) {
        throw new Error('Semester not found');
      }
      return semester;
    } catch (error) {
      throw new Error('Error finding semester: ' + error.message);
    }
  }
};

export default semesterService; 