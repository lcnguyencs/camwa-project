import express from 'express';
import facilityFacultyController from '../controllers/facultyManagement.controller.js';

const facilityFacultyRouter = express.Router();

facilityFacultyRouter.post('/', facilityFacultyController.createFacilityFaculty);
facilityFacultyRouter.get('/', facilityFacultyController.getAllFacilityFaculties);
facilityFacultyRouter.get('/:staff_id', facilityFacultyController.findFacilityFacultyById);
facilityFacultyRouter.delete('/:staff_id', facilityFacultyController.deleteFacilityFaculty);
facilityFacultyRouter.put('/:staff_id', facilityFacultyController.updateFacilityFaculty);

export default facilityFacultyRouter;
