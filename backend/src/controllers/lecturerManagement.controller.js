import lecturerService from '../services/lecturer.service.js';
import { responseSuccess, responseError } from '../common/helpers/response.helper.js';

const lecturerController = {
  createLecturer: async (req, res) => {
    try {
      const newLecturer = await lecturerService.createLecturer(req.body);
      res.status(201).json(responseSuccess(newLecturer, 'Lecturer created successfully'));
    } catch (error) {
      res.status(400).json(responseError(error.message, 400));
    }
  },

  getAllLecturers: async (req, res) => {
    try {
      const lecturers = await lecturerService.getAllLecturers();
      res.status(200).json(responseSuccess(lecturers, 'Lecturers retrieved successfully'));
    } catch (error) {
      res.status(500).json(responseError(error.message, 500));
    }
  },

  findLecturerById: async (req, res) => {
    const { staff_id } = req.params;
    try {
      const lecturer = await lecturerService.findLecturerById(staff_id);
      res.status(200).json(responseSuccess(lecturer, 'Lecturer found successfully'));
    } catch (error) {
      res.status(404).json(responseError(error.message, 404));
    }
  },

  deleteLecturer: async (req, res) => {
    const { staff_id } = req.params;
    try {
      const result = await lecturerService.deleteLecturer(staff_id);
      res.status(200).json(responseSuccess(null, result.message));
    } catch (error) {
      res.status(404).json(responseError(error.message, 404));
    }
  },

  updateLecturer: async (req, res) => {
    const { staff_id } = req.params;
    try {
      const updatedLecturer = await lecturerService.updateLecturer(staff_id, req.body);
      res.status(200).json(responseSuccess(updatedLecturer, 'Lecturer updated successfully'));
    } catch (error) {
      res.status(400).json(responseError(error.message, 400));
    }
  },
};

export default lecturerController;
