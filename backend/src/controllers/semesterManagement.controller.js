import semesterService from '../services/semester.service.js';
import { responseSuccess, responseError } from '../common/helpers/response.helper.js';

const semesterController = {
  getAllSemesters: async (req, res) => {
    try {
      const semesters = await semesterService.getAllSemesters();
      res.status(200).json(responseSuccess(semesters, 'Semesters retrieved successfully'));
    } catch (error) {
      res.status(500).json(responseError(error.message, 500));
    }
  },

  findSemesterById: async (req, res) => {
    const { sem_id } = req.params;
    try {
      const semester = await semesterService.findSemesterById(sem_id);
      res.status(200).json(responseSuccess(semester, 'Semester found successfully'));
    } catch (error) {
      res.status(404).json(responseError(error.message, 404));
    }
  }
};

export default semesterController; 