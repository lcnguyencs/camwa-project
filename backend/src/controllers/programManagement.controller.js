import programService from '../services/program.service.js';
import { responseSuccess, responseError } from '../common/helpers/response.helper.js';

const programController = {
  createProgram: async (req, res) => {
    try {
      const newProgram = await programService.createProgram(req.body);
      res.status(201).json(responseSuccess(newProgram, 'Program created successfully'));
    } catch (error) {
      res.status(400).json(responseError(error.message, 400));
    }
  },

  getAllPrograms: async (req, res) => {
    try {
      const programs = await programService.getAllPrograms();
      res.status(200).json(responseSuccess(programs, 'Programs retrieved successfully'));
    } catch (error) {
      res.status(500).json(responseError(error.message, 500));
    }
  },

  findProgramById: async (req, res) => {
    const { program_id } = req.params;
    try {
      const program = await programService.findProgramById(program_id);
      res.status(200).json(responseSuccess(program, 'Program found successfully'));
    } catch (error) {
      res.status(404).json(responseError(error.message, 404));
    }
  },

  deleteProgram: async (req, res) => {
    const { program_id } = req.params;
    try {
      const result = await programService.deleteProgram(program_id);
      res.status(200).json(responseSuccess(null, result.message));
    } catch (error) {
      res.status(404).json(responseError(error.message, 404));
    }
  },

  updateProgram: async (req, res) => {
    const { program_id } = req.params;
    try {
      const updatedProgram = await programService.updateProgram(program_id, req.body);
      res.status(200).json(responseSuccess(updatedProgram, 'Program updated successfully'));
    } catch (error) {
      res.status(400).json(responseError(error.message, 400));
    }
  },
};

export default programController;
