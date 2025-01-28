import facilityFacultyService from '../services/faculty.service.js';
import { responseSuccess, responseError } from '../common/helpers/response.helper.js';

const facilityFacultyController = {
  createFacilityFaculty: async (req, res) => {
    try {
      const newFacilityFaculty = await facilityFacultyService.createFacilityFaculty(req.body);
      res.status(201).json(responseSuccess(newFacilityFaculty, 'Facility Faculty created successfully'));
    } catch (error) {
      res.status(400).json(responseError(error.message, 400));
    }
  },

  getAllFacilityFaculties: async (req, res) => {
    try {
      const facilityFaculties = await facilityFacultyService.getAllFacilityFaculties();
      res.status(200).json(responseSuccess(facilityFaculties, 'Facility Faculties retrieved successfully'));
    } catch (error) {
      res.status(500).json(responseError(error.message, 500));
    }
  },

  findFacilityFacultyById: async (req, res) => {
    const { staff_id } = req.params;
    try {
      const facilityFaculty = await facilityFacultyService.findFacilityFacultyById(staff_id);
      res.status(200).json(responseSuccess(facilityFaculty, 'Facility Faculty found successfully'));
    } catch (error) {
      res.status(404).json(responseError(error.message, 404));
    }
  },

  deleteFacilityFaculty: async (req, res) => {
    const { staff_id } = req.params;
    try {
      const result = await facilityFacultyService.deleteFacilityFaculty(staff_id);
      res.status(200).json(responseSuccess(null, result.message));
    } catch (error) {
      res.status(404).json(responseError(error.message, 404));
    }
  },

  updateFacilityFaculty: async (req, res) => {
    const { staff_id } = req.params;
    try {
      const updatedFacilityFaculty = await facilityFacultyService.updateFacilityFaculty(staff_id, req.body);
      res.status(200).json(responseSuccess(updatedFacilityFaculty, 'Facility Faculty updated successfully'));
    } catch (error) {
      res.status(400).json(responseError(error.message, 400));
    }
  },
};

export default facilityFacultyController;
